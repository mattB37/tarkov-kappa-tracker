import type { Task, SimpleTask, SimpleItem, Objective, Item, HideoutData, CustomHideoutStationRequirements, HideoutStation, HideoutRequiredItem } from './types'
import { writeFile } from 'node:fs';
import { Buffer } from 'node:buffer';

const excludedItems: Set<string> = new Set(['RUB', 'EUR', 'USD']);

export const writeFilteredJSONDataToFile = (fileName: string, stringifiedJsonData: string) => {
    const data = new Uint8Array(Buffer.from(stringifiedJsonData));
    const file_path = `src/data/${fileName}`
    writeFile(file_path, data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
};

// convert a map of <string, task data> to JSON
export const toJSON = (map: Map<String, SimpleTask[]>) => {
    let obj: any = {};

    const getValue = (value: any): any => {
        if (value instanceof Map) {
            return toJSON(value);
        } else if (Array.isArray(value)) {
            return value.map(v => getValue(v));
        } else {
            return value;
        }
    }

    for (const [key, value] of map) {
        obj[key.toString()] = getValue(value);
    }

    return JSON.stringify(obj);
}

// retrieve unique trader names from Task data
export const getUniqueTraderNames = (kappaTasks: Task[]) => {
    const uniqueTraders: Set<string> = new Set();

    kappaTasks.forEach(task => {
        uniqueTraders.add(task.trader.name);
    });

    return uniqueTraders;
}

// filter out a trader - task name object which has all the tasks per trader required for kappa
export const createTaskTrackerData = (traderNames: Set<string>, kappaTasks: Task[]) => {
    const result: Map<string, SimpleTask[]> = new Map();

    traderNames.forEach(traderName => {
        result.set(
            traderName, []
        )
    });

    kappaTasks.forEach(task => {
        result.get(task.trader.name)?.push({
            id: task.id,
            name: task.name,
            wikiLink: task.wikiLink,
            isDone: false
        })
    });

    return JSON.stringify(toJSON(result));
}

export const createItemTrackerData = (kappaTasks: Task[]) => {
    const result: SimpleItem[] = new Array();
    // counter for creating unique item id
    let item_id: number = 0;
    // hardcoded list item categories where the image is not descriptive enough so we want to also render the name text underneath
    const setOfShouldRenderItemNames = new Set<string>(['stimulant', 'assault-rifle', 'mechanical-key', 'shotgun', 'handgun', 'custom']);

    const pushItem = (objective: Objective, item: Item, taskWikiLink: string, taskName: string) => {
        if (!excludedItems.has(item.shortName)) {
            result.push({
                id: item_id,
                name: item.name,
                shortName: item.shortName,
                requiredFIR: objective.foundInRaid,
                neededCount: objective.count,
                iconLink: item.iconLink,
                wikiLinkTask: taskWikiLink,
                wikiLinkItem: item.wikiLink,
                shouldRenderItemName: setOfShouldRenderItemNames.has(item.category.normalizedName) && taskName !== 'Collector', // currently not using this but might later
            });
            item_id += 1;
        }
    };

    kappaTasks.forEach(task => {
        task.objectives.forEach(objective => {
            // only count the "giveItem" objectives (some tasks have both giveItem and findItem resulting in duplicates)
            if (objective && objective.id && objective.type === "giveItem") {
                const taskName = task.name;
                // need some hardcoded task checks for tasks that have extra item/objective data that is not needed
                if (taskName === "First in Line") {
                    const customItem: Item = { name: "any medical items", shortName: "Meds", iconLink: 'src/assets/any-medical-item.webp', wikiLink: task.wikiLink, category: { normalizedName: "" } };
                    pushItem(objective, customItem, task.wikiLink, taskName);
                } else if (taskName === "Friend From the West - Part 1" || taskName === "The Punisher - Part 6") {
                    const customItem3: Item = { ...objective.items[0] };
                    customItem3.category.normalizedName = 'custom';
                    pushItem(objective, objective.items[0], task.wikiLink, taskName);
                } else if (taskName === "The Huntsman Path - Sellout" || taskName === "The Huntsman Path - Factory Chief" || taskName === "The Punisher - Part 5") {
                    pushItem(objective, objective.items[0], task.wikiLink, taskName);
                } else {
                    objective.items.forEach(item => {
                        pushItem(objective, item, task.wikiLink, taskName);
                    });
                };
            }
        });
    });

    return JSON.stringify(result);
}

export const createHideoutItemTrackerData = (hideoutData: HideoutData) => {

    // not really sure if this is the best way to get an ordering of hideout stations
    // or if I should just hardcode an order. kinda lazy so just leaving it

    // create a graph of hideout station requirements and run a topological sort to get the optimal order
    const optimalOrdering: string[] = []; // list of hideStation names in order

    // create the graph data structures
    const hideoutDataMap: Map<string, HideoutStation> = new Map(); // map of station name to raw data
    const hideoutStationAndLevelNameToStationName: Map<string, string> = new Map();
    const hideoutMap: Map<string, string[]> = new Map(); // map of hideoutStation "name + level" to "name + level" requirements
    hideoutData.hideoutStations.forEach((station) => {
        hideoutDataMap.set(station.name, station);
        station.levels.forEach((stationLevel) => {
            const stationName = `${station.name} ${stationLevel.level}`;
            hideoutStationAndLevelNameToStationName.set(stationName, station.name);
            hideoutMap.set(stationName, [])
            stationLevel.stationLevelRequirements.forEach((requirement) => {
                const requiredStationName = `${requirement.station.name} ${requirement.level}`
                hideoutMap.get(stationName)?.push(requiredStationName);
            })
        })
    });

    // run topological sort using DFS
    const visited: Set<string> = new Set();

    const dfs = (node: string, tempVisited: Set<string>) => {
        if (visited.has(node)) { // already added this node to the toposort
            return;
        }
        if (tempVisited.has(node)) { // found a cycle
            throw Error("found a cycle in the graph");
        }
        tempVisited.add(node);

        hideoutMap.get(node)?.forEach((neighbor) => {
            dfs(neighbor, tempVisited);
        })
        visited.add(node);
        optimalOrdering.push(node);
    }

    // loop through each node of the map and run DFS starting from each Node
    Array.from(hideoutMap.keys()).forEach((node) => {
        const tempVisited: Set<string> = new Set();
        dfs(node, tempVisited);
    })

    // re-map the topo sort ordering of station+level to the regular stations
    const seen: Set<string> = new Set();
    const ordering: string[] = new Array();
    optimalOrdering.forEach(stationAndLevelName => {
        const stationName = hideoutStationAndLevelNameToStationName.get(stationAndLevelName);
        if (stationName && !seen.has(stationName)) {
            seen.add(stationName);
            ordering.push(stationName);
        }
    })

    // loop through the ordering and create the filtered data for displaying on the site
    const result: CustomHideoutStationRequirements[] = [];
    ordering.forEach(stationName => {
        const curStationData = hideoutDataMap.get(stationName)
        const currentStationItemsRequired: HideoutRequiredItem[] = [];
        if (curStationData) {
            curStationData.levels.forEach(stationLevel => {
                stationLevel.itemRequirements.forEach(item => {
                    if (!excludedItems.has(item.item.shortName)) {
                        currentStationItemsRequired.push(
                            {
                                id: item.id,
                                count: item.count,
                                name: item.item.name,
                                shortName: item.item.shortName,
                                iconLink: item.item.iconLink,
                                wikiLink: item.item.wikiLink,
                                requiredForStationLevel: stationLevel.level,
                            }
                        );
                    }
                });
            });
            result.push(
                {
                    id: curStationData.id,
                    name: curStationData.name,
                    imageLink: curStationData.imageLink,
                    itemReqs: currentStationItemsRequired,
                }
            );
        }
    });

    return JSON.stringify(result);
}