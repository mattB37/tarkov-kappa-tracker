import type { SimpleTask } from "../../scripts/types";
import classNames from "classnames";

interface TaskItemProps {
    task: SimpleTask;
    index: number;
    handleTaskStatusChange: (index: number, newIsChecked: boolean) => void;
    taskStatusList: boolean[];
}

export const TaskItem: React.FC<TaskItemProps> = (props) => {
    const { task, index, handleTaskStatusChange, taskStatusList } = props;
    const isChecked = taskStatusList[index] ?? false;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleTaskStatusChange(index, event.target.checked);
    };

    return (
        <div className={classNames(
            "ba b--black pa3 center w-100",
            {
                "bg-dark-green": isChecked,
            }
        )}>
            <div className="dib pr2 left-0">
                <label>
                    <input
                        className='checkbox'
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <span className="dib pr2">|</span>
            <div className="dib ph2">
                <div>{task.name}</div>
            </div>
            <span className="dib ph2">|</span>
            <div className="dib pl2">
                <a href={task.wikiLink}>EFT Wiki Link</a>
            </div>
        </div>
    )
};