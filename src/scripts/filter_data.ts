import rawData from '../data/raw-task-data.json' with {type: "json"};
import type { TaskData } from './types';
import { getUniqueTraderNames, createTaskTrackerData, createItemTrackerData, createHideoutItemTrackerData } from './utils.ts';
import { writeFile } from 'node:fs';
import { Buffer } from 'node:buffer';

const writeFilteredJSONDataToFile = (fileName: string, stringifiedJsonData: string) => {
    const data = new Uint8Array(Buffer.from(stringifiedJsonData));
    const file_path = `src/data/${fileName}`
    writeFile(file_path, data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
};

const taskData = JSON.parse(JSON.stringify(rawData)) as TaskData;
const kappaTasks = taskData.tasks.filter(task => task.kappaRequired);
const traderNames = getUniqueTraderNames(kappaTasks);

const filteredTraderTaskData = createTaskTrackerData(traderNames, kappaTasks);
writeFilteredJSONDataToFile('filtered_trader_task_data.json', filteredTraderTaskData);

const filteredItemTrackerData = createItemTrackerData();
writeFilteredJSONDataToFile('filtered_trader_task_data.json', filteredItemTrackerData);

const filteredHideoutTrackerData = createHideoutItemTrackerData();
writeFilteredJSONDataToFile('filtered_trader_task_data.json', filteredHideoutTrackerData);