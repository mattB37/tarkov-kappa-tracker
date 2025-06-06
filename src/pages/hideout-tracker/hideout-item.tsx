import classNames from "classnames";
import type { HideoutRequiredItem } from "../../scripts/types";
import { useState } from "react";

interface HideoutItemProps {
    startingCount: number;
    neededCount: number;
    index: number;
    item: HideoutRequiredItem;
    handleUpdateLocalStorageData: (index: number, newCount: number) => void;
}

export const HideoutItem: React.FC<HideoutItemProps> = (props) => {
    const { startingCount, neededCount, index, item, handleUpdateLocalStorageData } = props;
    const [currentCount, setCurrentCount] = useState<number>(startingCount);

    const handleAddBtnClick = () => {
        const newCount = neededCount >= 10 ? neededCount : Math.min(neededCount, currentCount + 1);
        setCurrentCount(newCount);
        handleUpdateLocalStorageData(index, newCount);
    };

    const handleSubtractBtnClick = () => {
        const newCount = neededCount >= 10 ? 0 : Math.max(0, currentCount - 1);
        setCurrentCount(newCount);
        handleUpdateLocalStorageData(index, newCount);
    };

    const isComplete = currentCount === neededCount;

    const colorMap = ['red', 'orange', 'yellow', 'green', 'blue', 'light-purple',]
    const levelInRange = item.requiredForStationLevel <= colorMap.length;
    const lvlColor = levelInRange && !isComplete ? colorMap[item.requiredForStationLevel - 1] : isComplete ? 'green' : 'white'

    return (
        <div className={classNames(
            "flex flex-column b--black ba bw1 br1 pa2",
            { "b--dark-green": isComplete }
        )}>
            <div className="flex flex-column center justify-center">
                <div className={`f5 ${lvlColor}`}>*lvl {item.requiredForStationLevel}</div>
                <img style={{ height: "75px", width: "75px" }} src={item.iconLink} alt={item.name} />
                <a className="b f6" href={item.wikiLink}>{item.shortName}</a>
                <div className={classNames(
                    "f6 b",
                    { "dark-green": isComplete }
                )}>{currentCount}/{neededCount}</div>
                <div className="flex flex-row justify-center ma1">
                    <button className="mr2 white w2 h2 hover-yellow" onClick={handleAddBtnClick}>+1</button>
                    <button className="white w2 h2 hover-yellow" onClick={handleSubtractBtnClick}>-1</button>
                </div>
            </div>
        </div >
    );
}