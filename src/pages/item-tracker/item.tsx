import { useState } from "react";
import type { SimpleItem } from "../../scripts/types";
import classNames from "classnames";
import { LOCAL_STORAGE_KEY } from "./constants";
import React from "react";
import useResponsiveView from "../../hooks/useResponsiveView";

interface ItemProps {
    item: SimpleItem
    index: number
    startingCount: number
}

export const Item: React.FC<ItemProps> = (props) => {
    const { item, index, startingCount } = props;
    const [itemCount, setItemCount] = useState<number>(startingCount);

    const handleUpdateLocalStorageData = (index: number, newCount: number) => {
        try {
            const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (localStorageData) {
                const itemCounts: number[] = JSON.parse(localStorageData);
                itemCounts[index] = newCount;
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(itemCounts));
            }
        } catch (error) {
            console.error('Error updating item data in local storage', error);
        }
    }

    const handleAddBtnClick = () => {
        // for items with the needed count
        const newCount = item.neededCount > 50 ? item.neededCount : Math.min(item.neededCount, itemCount + 1);
        setItemCount(newCount);
        handleUpdateLocalStorageData(index, newCount);
    }
    const handleSubtractBtnClick = () => {
        const newCount = item.neededCount > 50 ? 0 : Math.max(0, itemCount - 1);
        setItemCount(newCount);
        handleUpdateLocalStorageData(index, newCount);
    }

    return (
        <div className={classNames(
            "flex flex-column b--black ba bw1 br1 pa2",
            { "b--dark-green bg-dark-green": itemCount === item.neededCount }
        )}>
            <div className="flex flex-column center justify-center">
                <img style={{ height: "90px", width: "90px" }} src={item.iconLink} alt={item.name} />
                <div className="b">{item.shouldRenderItemName ? item.shortName : null}</div>
                <div className="f5 b">{itemCount}/{item.neededCount} {item.requiredFIR ? <span className="red">*FIR</span> : null}</div>
                <div className="flex flex-row justify-center ma1">
                    <button className="mr2 white w2 h2 hover-yellow" onClick={handleAddBtnClick}>+1</button>
                    <button className="white w2 h2 hover-yellow" onClick={handleSubtractBtnClick}>-1</button>
                </div>
                <div className="flex justify-center">
                    <a href={item.wikiLinkTask} className="white underline mr2 hover-yellow">Task</a>
                    {item.wikiLinkItem !== "" ? <a href={item.wikiLinkItem} className="white underline hover-yellow">Item</a> : "N/A"}
                </div>
            </div>
        </div>
    )
};

{/* <div className={classNames(
            "flex flex-column ba bw1 br1 pa2",
            { "b--green": item.requiredFIR },
            { "b--red": !item.requiredFIR },
            { "bg-dark-green": itemCount === item.neededCount }
        )}>
            <div className="flex center justify-center">
                <img style={{ height: "90px", width: "90px" }} src={item.iconLink} alt={item.name} />
                <div className="flex-column ml2 mr2">
                    <div className={classNames("f6 b", { "green": item.requiredFIR, "red": !item.requiredFIR })}>
                        FIR? {item.requiredFIR ? "YES" : "NO"}
                    </div>
                    <div className="f5 b">{item.shortName}</div>
                    <div className="f5 b">{itemCount} / {item.neededCount}</div>
                </div>
                <div className="flex flex-column justify-center mr2">
                    <button className="ba b--dark-blue white br2 hover-bg-blue w2 h2" onClick={handleAddBtnClick}>+1</button>
                    <button className="ba b--dark-red white br2 hover-bg-red w2 h2" onClick={handleSubtractBtnClick}>-1</button>
                </div>
                <div className="flex flex-column mr2">
                    <a href={item.wikiLinkTask}>Task wiki link</a>
                    {item.wikiLinkItem !== "" ? <a href={item.wikiLinkTask}>Item wiki link</a> : "N/A"}
                </div>
            </div>
        </div>
         */}
export default Item;