import rawData from '../data/raw-task-data.json' with {type: "json"};
import type { TaskData } from './types';
import { writeFilteredJSONDataToFile, getUniqueTraderNames, createTaskTrackerData, createItemTrackerData, createHideoutItemTrackerData } from './utils.ts';

const taskData = rawData as TaskData;
const kappaTasks = taskData.tasks.filter(task => task.kappaRequired);
const traderNames = getUniqueTraderNames(kappaTasks);

const filteredTraderTaskData = createTaskTrackerData(traderNames, kappaTasks);
writeFilteredJSONDataToFile('filtered_trader_task_data.json', filteredTraderTaskData);

const filteredItemTrackerData = createItemTrackerData();
writeFilteredJSONDataToFile('filtered_trader_task_data.json', filteredItemTrackerData);

const filteredHideoutTrackerData = createHideoutItemTrackerData();
writeFilteredJSONDataToFile('filtered_trader_task_data.json', filteredHideoutTrackerData);