import type { Task, SimpleTask, SimpleItem, pushItemParams, Objective, Item } from './types'
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

// convert a map of string to task data to JSON
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
    let item_id: number = 0;
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
            if (objective && objective.id && objective.type === "giveItem") {
                const taskName = task.name;
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

export const createHideoutItemTrackerData = () => {
    return "";
}