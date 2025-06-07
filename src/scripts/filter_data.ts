import rawData from '../data/raw-task-data.json' with {type: "json"};
import hideoutRawData from '../data/raw-hideout-data.json' with {type: "json"}
import type { TaskData, HideoutData } from './types';
import { writeFilteredJSONDataToFile, getUniqueTraderNames, createTaskTrackerData, createItemTrackerData, createHideoutItemTrackerData } from './utils.ts';

const taskData = JSON.parse(JSON.stringify(rawData)).data as TaskData;
const kappaTasks = taskData.tasks.filter(task => task.kappaRequired);
const traderNames = getUniqueTraderNames(kappaTasks);
const hideoutData = JSON.parse(JSON.stringify(hideoutRawData)).data as HideoutData;

const filteredTraderTaskData = createTaskTrackerData(traderNames, kappaTasks);
writeFilteredJSONDataToFile('filtered_trader_task_data.json', filteredTraderTaskData);

const filteredItemTrackerData = createItemTrackerData(kappaTasks);
writeFilteredJSONDataToFile('filtered_item_data.json', filteredItemTrackerData);

const filteredHideoutTrackerData = createHideoutItemTrackerData(hideoutData);
writeFilteredJSONDataToFile('filtered_hideout_data.json', filteredHideoutTrackerData);