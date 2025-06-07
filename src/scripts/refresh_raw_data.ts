// TODO write a node script here which queries the Tarkov.dev graphQL api endpoint and updates the raw data files
import { writeFilteredJSONDataToFile } from './utils.ts';
import { hideoutDataQuery, taskDataQuery } from './consts.ts';

const GRAPHQL_ENDPOINT = 'https://api.tarkov.dev/graphql';
const runQuery = async (query: string, fileName: string) => {
    try {
        const response = await fetch(GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                gameMode: "regular"
            }),
        });

        if (!response.ok) {
            throw new Error(`❌ Network response error: ${response.statusText}`);
        }

        const jsonResponse: any = await response.json();

        if (!jsonResponse) {
            throw new Error('❌ json response is missing');
        }

        writeFilteredJSONDataToFile(fileName, JSON.stringify(jsonResponse));

        console.log(`✅ Data successfully fetched and saved to ${fileName}`);

    } catch (error) {
        throw new Error(`An error occurred: ${error}`);
    }
};

async function fetchAndSaveData() {
    console.log('🚀 Starting fetch...');
    runQuery(hideoutDataQuery, "raw-hideout-data.json");
    runQuery(taskDataQuery, "raw-task-data.json")
    console.log('✅ finished fetch')
}

fetchAndSaveData();