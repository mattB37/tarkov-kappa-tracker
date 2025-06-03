import type { Task, SimpleTask, SimpleItem, Objective, Item, HideoutData, CustomHideoutStationRequirements } from './types'
import { writeFile } from 'node:fs';
import { Buffer } from 'node:buffer';

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
        result.push({
            id: item_id,
            name: item.name,
            shortName: item.shortName,
            requiredFIR: objective.foundInRaid,
            neededCount: objective.count,
            iconLink: item.iconLink,
            wikiLinkTask: taskWikiLink,
            wikiLinkItem: item.wikiLink,
            shouldRenderItemName: setOfShouldRenderItemNames.has(item.category.normalizedName) && taskName !== 'Collector',
        });
        item_id += 1;
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

    // create a graph of hideout station requirements and run a topological sort to get the optimal order
    const optimalOrdering: string[] = []; // list of hideStation names in order

    // create the graph data structures
    let item_id = 0; // unique id for all hideout stations
    const hideoutDataMap: Map<string, CustomHideoutStationRequirements> = new Map(); // map of hideStation "name + level" to custom hideoutStation object
    const hideoutMap: Map<string, string[]> = new Map(); // map of hideoutStation "name + level" to "name + level" requirements
    hideoutData.hideoutStations.forEach((station) => {
        station.levels.forEach((stationLevel) => {
            const stationName = `${station.name} ${stationLevel.level}`;
            const customStation: CustomHideoutStationRequirements = {
                id: item_id,
                name: stationName,
                level: stationLevel.level,
                itemReqs: stationLevel.itemRequirements
            };
            item_id += 1;
            hideoutDataMap.set(stationName, customStation);
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

    // loop through the ordering an create a list of hideout stations
    const result: CustomHideoutStationRequirements[] = new Array();

    optimalOrdering.forEach((station) => {
        const customStationObj = hideoutDataMap.get(station);
        if (customStationObj) {
            result.push(customStationObj);
        }
    })

    return JSON.stringify(result);
}