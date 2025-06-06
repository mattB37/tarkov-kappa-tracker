import '../../index.css'
import { useState } from 'react';
import { Traders } from './traders';
import type { SimpleTask } from '../../scripts/types';
import { TraderTasks } from './trader-tasks';

interface TaskTrackerProps {
    taskData: Map<string, SimpleTask[]>
}

export const TaskTracker: React.FC<TaskTrackerProps> = (props) => {
    const { taskData } = props;
    const traderNames = Array.from(taskData.keys());
    const [selectedTrader, setSelectedTrader] = useState<string>("Therapist");
    const tasks = taskData.get(selectedTrader);

    return (
        <div className='tc'>
            <h1 className="mb2">Kappa Task Tracker</h1>
            <div className='mb2'>
                Select a trader and track your tasks here. Task status is automatically saved to your browser's local storage.
            </div>
            <div data-testid='task-list'>
                <div className="flex justify-center list pa2">
                    <Traders traderNames={traderNames} setSelectedTrader={setSelectedTrader} selectedTrader={selectedTrader} />
                </div>
                {tasks && <TraderTasks traderNames={traderNames} tasks={tasks} selectedTrader={selectedTrader} />}
            </div>
        </div>
    );
};

export default TaskTracker;