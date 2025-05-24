import data from './task-data.json' with {type: "json"};

interface Item {
    name: string;
}

interface Objective {
    id?: string;
    foundInRaid?: boolean;
    count?: number;
    description?: string;
    items?: Item[];
}

interface Trader {
    name: string;
}

interface Task {
    id: string;
    name: string;
    kappaRequired: boolean;
    wikiLink: string;
    trader: Trader;
    objectives: Objective[];
}

interface TaskData {
    tasks: Task[];
}

const taskData = JSON.parse(JSON.stringify(data)) as TaskData;

const kappaTasks = taskData.tasks.filter(task => task.kappaRequired);

const getUniqueTraderNames = () => {
    const uniqueTraders: Set<string> = new Set();
    kappaTasks.forEach(task => {
        uniqueTraders.add(task.trader.name);
    });
    return uniqueTraders;
}
const traderNames = getUniqueTraderNames();

// filter out a trader - task name object which has all the tasks per trader required for kappa
interface SimpleTask {
    id: string;
    name: string;
    wikiLink: string;
}
const createTaskTrackerData = () => {
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
    return result;
}

console.log(createTaskTrackerData());

const createTaskItemTrackerData = () => {
    return "";
}

const createHideoutItemTrackerData = () => {
    return "";
}

// Get all items required for all tasks
// function getAllItems(tasks: Task[]): Item[] {
//     const allItems: Item[] = [];
//     tasks.forEach(task => {
//         task.objectives.forEach(objective => {
//             if (objective.items) {
//                 objective.items.forEach(item => {
//                     if (!allItems.find(i => i.name === item.name)) {
//                         allItems.push(item);
//                     }
//                 });
//             }
//         });
//     });
//     return allItems;
// }

// const allItems = getAllItems(taskData.tasks);
// console.log("All Items:", allItems);