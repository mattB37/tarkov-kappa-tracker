import { useEffect, useState } from "react";
import type { SimpleTask } from "../../scripts/types";
import classNames from "classnames";
import { TaskItem } from "./task-item";

interface TraderTasksProps {
    tasks: SimpleTask[],
    selectedTrader: string,
}

export const TraderTasks: React.FC<TraderTasksProps> = (props) => {
    const { tasks, selectedTrader } = props;

    const LOCAL_STORAGE_KEY = `${selectedTrader}-info`;

    const defaultTaskStatusList = new Array(tasks.length).fill(false);
    const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const [taskStatusList, setTaskStatusList] = useState<boolean[]>(localStorageData ? JSON.parse(localStorageData) : defaultTaskStatusList);

    useEffect(() => {
        const localStorageData = localStorage.getItem(selectedTrader);

        setTaskStatusList(
            localStorageData
                ? JSON.parse(localStorageData)
                : new Array(tasks.length).fill(false)
        );
    }, [selectedTrader])

    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskStatusList));
            console.log('Tasks saved to local storage!');
        } catch (error) {
            console.error('Error saving data to local storage:', error);
        }
    }, [taskStatusList])

    const handleTaskStatusChange = (index: number, newValue: boolean) => {
        const updatedList = [...taskStatusList];
        updatedList[index] = newValue;
        setTaskStatusList(updatedList);
    };

    console.log("trader tasks", taskStatusList[0])

    return (
        <ul className='overflow-y-scroll pa0 ma0'>
            {tasks?.map((task, index) => {
                return (
                    <li key={task.id} className={classNames(
                        'flex justify-center tc',
                    )}>
                        <TaskItem task={task} taskStatusList={taskStatusList} index={index} handleTaskStatusChange={handleTaskStatusChange} />
                    </li>
                );
            })}
        </ul>
    );
};

// export const TraderTasks: React.FC<TraderTasksProps> = (props) => {
//     const { tasks, selectedTrader } = props;

//     const [taskStatusList, setTaskStatusList] = useState<boolean[]>(new Array(tasks.length).fill(false));
//     const LOCAL_STORAGE_KEY = `${selectedTrader}-kappa-tracker-local-storage-info`;

//     useEffect(() => {
//         const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
//         if (storedData) {
//             try {
//                 const parsedData = JSON.parse(storedData) as boolean[];
//                 setTaskStatusList(parsedData);
//             } catch (error) {
//                 console.error('Error parsing data from local storage:', error);
//             }
//         } else {
//             setTaskStatusList(new Array(tasks?.length).fill(false));
//         }
//     }, [selectedTrader]);

//     useEffect(() => {
//         console.log(LOCAL_STORAGE_KEY)
//         try {
//             localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskStatusList));
//             console.log('Tasks saved to local storage!');
//         } catch (error) {
//             console.error('Error saving data to local storage:', error);
//         }
//     }, [taskStatusList]);

//     const handleTaskStatusChange = (index: number, newValue: boolean) => {
//         const updatedTasks = [...taskStatusList];
//         updatedTasks[index] = newValue;
//         setTaskStatusList(updatedTasks);
//     };

//     return (
//         <ul className='overflow-y-scroll pa0 ma0'>
//             {tasks?.map((task, index) => {
//                 return (
//                     <li key={task.id} className={classNames(
//                         'flex justify-center tc',
//                     )}>
//                         <TaskItem task={task} initialStatus={taskStatusList[index]} index={index} handleTaskStatusChange={handleTaskStatusChange} />
//                     </li>
//                 );
//             })}
//         </ul>
//     );
// };