import '../../index.css'
import { useEffect, useState } from 'react';
import { Trader } from './trader';
import type { SimpleTask } from '../../scripts/types';
import classNames from 'classnames';
import { TaskItem } from './task-item';

type TraderToImage = {
    [key: string]: string;
}

const traderNameToImagePath: TraderToImage = {
    "Therapist": 'src/assets/trader_images/therapist.webp',
    "Prapor": 'src/assets/trader_images/prapor.webp',
    "Skier": 'src/assets/trader_images/skier.webp',
    "Mechanic": 'src/assets/trader_images/mechanic.webp',
    "Jaeger": 'src/assets/trader_images/jaeger.webp',
    "Peacekeeper": 'src/assets/trader_images/peacekeeper.webp',
    "Ragman": 'src/assets/trader_images/ragman.webp',
    "Fence": 'src/assets/trader_images/fence.webp',
}

interface TaskTrackerProps {
    taskData: Map<string, SimpleTask[]>
}

export const TaskTracker: React.FC<TaskTrackerProps> = (props) => {
    const { taskData } = props;

    const [selectedTrader, setSelectedTrader] = useState<string>("Therapist");
    const tasks = taskData.get(selectedTrader);

    const localStorageData = localStorage.getItem(selectedTrader);
    const [taskStatusList, setTaskStatusList] = useState<boolean[]>(localStorageData ? JSON.parse(localStorageData) : []);

    useEffect(() => {
        const currentTasks = taskData.get(selectedTrader);
        const localStorageData = localStorage.getItem(selectedTrader);

        setTaskStatusList(
            localStorageData
                ? JSON.parse(localStorageData)
                : new Array(currentTasks?.length).fill(false)
        );
    }, [selectedTrader])

    const updateLocalStorage = (newList: boolean[]) => {
        try {
            localStorage.setItem(selectedTrader, JSON.stringify(newList));
            console.log('Tasks saved to local storage!');
        } catch (error) {
            console.error('Error saving data to local storage:', error);
        }
    }

    const handleTaskStatusChange = (index: number, newValue: boolean) => {
        const updatedList = [...taskStatusList];
        updatedList[index] = newValue;
        setTaskStatusList(updatedList);
        updateLocalStorage(updatedList);
    };

    return (
        <>
            <h1>This is the task tracker page</h1>
            <div className='mb2'>
                Select a trader and track your tasks here. Task status is automatically saved to your browser's local storage.
            </div>
            <div data-testid='task-list'>
                <div className="flex justify-center list pa2">
                    {Array.from(taskData.keys()).map((traderName: string) => {
                        return (
                            <li key={traderName}>
                                <Trader traderName={traderName} traderImagePath={traderNameToImagePath[traderName]} selectedTrader={selectedTrader} setSelectedTrader={setSelectedTrader} />
                            </li>
                        )
                    })}
                </div>
                {tasks && (
                    <ul className='overflow-y-scroll pa0 ma0'>
                        {tasks?.map((task, index) => {
                            return (
                                <li key={task.id} className={classNames(
                                    'flex justify-center tc',
                                )}>
                                    <TaskItem task={task} index={index} handleTaskStatusChange={handleTaskStatusChange} taskStatusList={taskStatusList} />
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </>
    );
};

export default TaskTracker;