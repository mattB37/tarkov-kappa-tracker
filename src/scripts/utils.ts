import type { Task, SimpleTask } from './types'

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

    return obj;
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
            wikiLink: task.wikiLink
        })
    });

    return JSON.stringify(toJSON(result));
}

export const createItemTrackerData = () => {
    return "";
}

export const createHideoutItemTrackerData = () => {
    return "";
}