import { useState } from "react"
import { LOCAL_STORAGE_KEY } from "./constants"

interface HideoutItemProps {
    startingCount: number
    neededCount: number
    name: string
    shortName: string
    iconLink: string
    wikiLink: string
    index1: number
    index2: number
}

export const HideoutItem: React.FC<HideoutItemProps> = (props) => {
    const { startingCount, neededCount, name, shortName, iconLink, wikiLink, index1, index2 } = props;
    const [count, setCount] = useState<number>(startingCount);

    const handleUpdateLocalStorageData = (index1: number, index2: number, newCount: number) => {
        try {
            const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (localStorageData) {
                const itemCounts: number[][] = JSON.parse(localStorageData);
                itemCounts[index1][index2] = newCount;
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(itemCounts));
            }
        } catch (error) {
            console.error('Error updating item data in local storage', error);
        }
    }

    const handleAddBtnClick = () => {
        // for items with the needed count
        const newCount = neededCount > 50 ? neededCount : Math.min(neededCount, count + 1);
        setCount(newCount);
        handleUpdateLocalStorageData(index1, index2, newCount);
    }
    const handleSubtractBtnClick = () => {
        const newCount = neededCount > 50 ? 0 : Math.max(0, neededCount);
        setCount(newCount);
        handleUpdateLocalStorageData(index1, index2, newCount);
    }

    return (
        <div>
            <div>{name}</div>
            <div>{count}/{neededCount}</div>
            <div className="flex flex-row justify-center ma1">
                <button className="mr2 white w2 h2 hover-yellow" onClick={handleAddBtnClick}>+1</button>
                <button className="white w2 h2 hover-yellow" onClick={handleSubtractBtnClick}>-1</button>
            </div>
        </div>
    )
}