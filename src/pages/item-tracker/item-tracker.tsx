import { useEffect, useState } from "react";
import type { SimpleItem } from "../../scripts/types";
import { LOCAL_STORAGE_KEY } from "./constants";
import { Item } from './item';
import useResponsiveView from "../../hooks/useResponsiveView";
import classNames from "classnames";

interface ItemTrackerProps {
    itemData: SimpleItem[]
}

export const ItemTracker: React.FC<ItemTrackerProps> = (props) => {
    const { itemData } = props;
    const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const [startingCounts, setStartingCounts] = useState<number[]>(localStorageData ? JSON.parse(localStorageData) : []);
    const isMobile = useResponsiveView();

    useEffect(() => {
        try {
            if (!localStorageData) {
                const defaultData = new Array(itemData.length).fill(0);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultData));
                setStartingCounts(defaultData);
            }
        } catch (error) {
            console.error('Error saving default data to local storage:', error);
        }
    }, []);

    return (
        <div>
            <ul className={classNames(
                "list pa0 ma0 flex flex-wrap justify-center",
                { "mr3 ml3": !isMobile },
                { "ml2": isMobile }
            )}>
                {itemData.map((item, index) => {
                    return (
                        <li key={item.id} className="ma2">
                            <Item item={item} index={index} startingCount={startingCounts ? startingCounts[index] : 0} />
                        </li>
                    );
                })}
            </ul>
        </div >
    );
}

export default ItemTracker;