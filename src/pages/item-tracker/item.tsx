import { useState } from "react";
import type { SimpleItem } from "../../scripts/types";
import classNames from "classnames";
import React from "react";
import AnyMedItemImg from "../../assets/any-medical-item.webp";

interface ItemProps {
    item: SimpleItem
    index: number
    startingCount: number
    handleUpdateLocalStorageData: (index: number, newCount: number) => void
    shouldHideCompletedItems: boolean
}

export const Item: React.FC<ItemProps> = (props) => {
    const { item, index, startingCount, handleUpdateLocalStorageData, shouldHideCompletedItems } = props;
    const [itemCount, setItemCount] = useState<number>(startingCount);

    if (shouldHideCompletedItems && itemCount === item.neededCount) {
        return
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

    const itemImage = item.shortName === 'Meds' ? AnyMedItemImg : item.iconLink;

    return (
        <div className={classNames(
            "flex flex-column b--black ba bw1 br1 pa2",
            { "b--dark-green bg-dark-green": itemCount === item.neededCount }
        )}>
            <div className="flex flex-column center justify-center">
                <img style={{ height: "90px", width: "90px" }} src={itemImage} alt={item.name} />
                <div className="b">{item.shortName}</div>
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

export default Item;