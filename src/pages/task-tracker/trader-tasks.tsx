import { useEffect, useState } from "react";
import type { SimpleTask } from "../../scripts/types";
import classNames from "classnames";
import { TaskItem } from "./task-item";
import "../../index.css"

interface TraderTasksProps {
    tasks: SimpleTask[],
    traderNames: string[],
    selectedTrader: string,
}

export const TraderTasks: React.FC<TraderTasksProps> = (props) => {
    const { tasks, selectedTrader, traderNames } = props;
    const localStorageData = localStorage.getItem(selectedTrader);
    const [taskStatusList, setTaskStatusList] = useState<boolean[]>(localStorageData ? JSON.parse(localStorageData) : []);

    const [shouldHideCompletedTasks, setShouldHideCompletedTasks] = useState<boolean>(false);
    const handleOnClickHideTasks = () => {
        setShouldHideCompletedTasks(!shouldHideCompletedTasks)
    }
    const handleResetTaskTracking = () => {
        traderNames.forEach((traderName) => {
            localStorage.removeItem(traderName);
        })
        window.location.reload();
    }

    useEffect(() => {
        const localStorageData = localStorage.getItem(selectedTrader);
        setTaskStatusList(
            localStorageData
                ? JSON.parse(localStorageData)
                : new Array(tasks?.length).fill(false)
        );
    }, [selectedTrader])

    const handleTaskStatusChange = (index: number, newValue: boolean) => {
        const updatedList = [...taskStatusList];
        updatedList[index] = newValue;
        setTaskStatusList(updatedList);
        try {
            localStorage.setItem(selectedTrader, JSON.stringify(updatedList));
        } catch (error) {
            console.error('Error saving data to local storage:', error);
        }
    };

    return (
        <>
            <button className="base-btn" onClick={handleOnClickHideTasks}>{shouldHideCompletedTasks ? 'Show Completed' : 'Hide Completed'}</button>
            <button className="ml2 mb2 base-btn" onClick={handleResetTaskTracking}>Reset Tracking</button>
            <ul className='overflow-y-scroll pa0 ma0'>
                {tasks?.map((task, index) => {
                    return (
                        <li key={task.id} className={classNames(
                            'flex justify-center tc',
                        )}>
                            <TaskItem task={task} isChecked={taskStatusList[index]} index={index} handleTaskStatusChange={handleTaskStatusChange} shouldHideCompletedTasks={shouldHideCompletedTasks} />
                        </li>
                    );
                })}
            </ul>
        </>
    );
};