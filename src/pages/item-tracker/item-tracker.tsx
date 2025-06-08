import { useEffect, useState } from "react";
import type { SimpleItem } from "../../scripts/types";
import { LOCAL_STORAGE_KEY } from "./constants";
import { Item } from './item';
import classNames from "classnames";

interface ItemTrackerProps {
    itemData: SimpleItem[]
}

export const ItemTracker: React.FC<ItemTrackerProps> = (props) => {
    const { itemData } = props;
    const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const startingCounts = localStorageData ? JSON.parse(localStorageData) : new Array(itemData.length).fill(0);
    const [shouldHideCompletedItems, setShouldHideCompletedItems] = useState<boolean>(false);

    useEffect(() => {
        try {
            if (!localStorageData) {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(startingCounts));
            }
        } catch (error) {
            console.error('Error saving default data to local storage:', error);
        }
    }, []);

    const handleResetItemTracking = () => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(new Array(itemData.length).fill(0)));
        window.location.reload();
    }

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

    return (
        <div>
            <div className="justify-center flex flex-row">
                <button className='base-btn mr2' onClick={handleResetItemTracking}>Reset Tracking</button>
                <button className="base-btn" onClick={() => { setShouldHideCompletedItems(!shouldHideCompletedItems) }}>{shouldHideCompletedItems ? 'Show Completed' : 'Hide Completed'}</button>
            </div>
            <ul className={classNames(
                "list pa0 ma0 flex flex-wrap justify-center mr1 ml1"
            )}>
                {itemData.map((item, index) => {
                    return (
                        <li key={item.id}>
                            <Item item={item} index={index} startingCount={startingCounts ? startingCounts[index] : 0} handleUpdateLocalStorageData={handleUpdateLocalStorageData} shouldHideCompletedItems={shouldHideCompletedItems} />
                        </li>
                    );
                })}
            </ul>
        </div >
    );
}

export default ItemTracker;