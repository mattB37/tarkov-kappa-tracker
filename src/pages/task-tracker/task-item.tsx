import type { SimpleTask } from "../../scripts/types";
import classNames from "classnames";

interface TaskItemProps {
    task: SimpleTask;
    index: number;
    handleTaskStatusChange: (index: number, newIsChecked: boolean) => void;
    isChecked: boolean;
    shouldHideCompletedTasks: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = (props) => {
    const { task, index, handleTaskStatusChange, shouldHideCompletedTasks, isChecked } = props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleTaskStatusChange(index, event.target.checked);
    };

    if (shouldHideCompletedTasks && isChecked) {
        return (undefined);
    }

    return (
        <div className={classNames(
            "bg-mid-gray mb2 b--black pa3 w-75 f6 f4-l",
            {
                "bg-dark-green": isChecked,
            }
        )}>
            <div className="dib pr2 left-0">
                <label>
                    <input
                        type="checkbox"
                        checked={isChecked ?? false}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className="dib ph2">
                <div>{task.name}</div>
            </div>
            <div className="dib pl2">
                <a href={task.wikiLink} className="white hover-black underline">EFT Wiki Link</a>
            </div>
        </div>
    )
};