import { useEffect, useState } from "react";
import type { SimpleTask } from "../../scripts/types";
import classNames from "classnames";
import { TaskItem } from "./task-item";

interface TraderTasksProps {
    tasks: SimpleTask[],
    selectedTrader: string,
    shouldHideCompletedTasks: boolean
}

export const TraderTasks: React.FC<TraderTasksProps> = (props) => {
    const { tasks, selectedTrader, shouldHideCompletedTasks } = props;
    const localStorageData = localStorage.getItem(selectedTrader);
    const [taskStatusList, setTaskStatusList] = useState<boolean[]>(localStorageData ? JSON.parse(localStorageData) : []);

    useEffect(() => {
        const localStorageData = localStorage.getItem(selectedTrader);
        setTaskStatusList(
            localStorageData
                ? JSON.parse(localStorageData)
                : new Array(tasks?.length).fill(false)
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
        <ul className='overflow-y-scroll pa0 ma0'>
            {tasks?.map((task, index) => {
                return (
                    <li key={task.id} className={classNames(
                        'flex justify-center tc',
                    )}>
                        <TaskItem task={task} taskStatusList={taskStatusList} index={index} handleTaskStatusChange={handleTaskStatusChange} shouldHideCompletedTasks={shouldHideCompletedTasks} />
                    </li>
                );
            })}
        </ul>
    );
};