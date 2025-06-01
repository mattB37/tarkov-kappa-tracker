import TaskTracker from "./task-tracker";
import { Layout } from "../../components";
import data from '../../data/filtered_trader_task_data.json';
import type { SimpleTask } from '../../scripts/types';
import { useEffect } from "react";

export const TaskTrackerPage: React.FC = () => {
    const taskData = new Map<string, SimpleTask[]>(Object.entries(JSON.parse(data)));

    useEffect(() => {
        taskData.forEach((value, key) => {
            try {
                if (!localStorage.getItem(key)) {
                    localStorage.setItem(key, JSON.stringify(new Array(value.length).fill(false)));
                }
            } catch (error) {
                console.error('Error saving default data to local storage:', error);
            }
        })
    }, [])

    return (
        <Layout>
            <TaskTracker taskData={taskData} />
        </Layout>
    );
};

export default TaskTrackerPage;