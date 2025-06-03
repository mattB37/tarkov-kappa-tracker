import { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "./constants";
import { HideoutItem } from './hideout-item';
import useResponsiveView from "../../hooks/useResponsiveView";
import classNames from "classnames";
import type { CustomHideoutStationRequirements } from "../../scripts/types";

interface ItemTrackerProps {
    hideoutData: CustomHideoutStationRequirements[]
}

export const HideoutTracker: React.FC<ItemTrackerProps> = (props) => {
    const { hideoutData } = props;
    const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);
    // startingCounts is a 2d array
    //      index 1 corresponds to the position of the hideout station in hideoutData
    //      index 2 corresponds to the item count in the list of requirements 
    const [startingCounts, setStartingCounts] = useState<number[][]>(localStorageData ? JSON.parse(localStorageData) : []);
    const isMobile = useResponsiveView();

    useEffect(() => {
        try {
            if (!localStorageData) {
                const defaultData = new Array(hideoutData.length).fill([]); // number of stations total
                defaultData.forEach((arr, index) => { // for each station there are X levels each needs an array of items
                    const station = hideoutData.at(index);
                    if (station) {
                        arr.push(new Array(station.itemReqs.length).fill(0));
                    }
                })
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
                "list pa0 ma0 flex flex-column justify-center",
                { "mr3 ml3": !isMobile },
                { "ml2": isMobile }
            )}>
                {hideoutData.map((station, index1) => {
                    return (
                        <li key={station.id} className="ma2">
                            <div className="flex flex-row overflow-x-auto">
                                {station.itemReqs.map((subStation, index2) => {
                                    return (
                                        <li key={subStation.id}>
                                            <HideoutItem
                                                startingCount={startingCounts && startingCounts[index1] ? startingCounts[index1][index2] : 0}
                                                neededCount={subStation.count}
                                                name={subStation.item.name}
                                                shortName={subStation.item.shortName}
                                                iconLink={subStation.item.iconLink}
                                                wikiLink={subStation.item.wikiLink}
                                                index1={index1}
                                                index2={index2}
                                            />
                                        </li>
                                    );
                                })}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div >
    );
}

export default HideoutTracker;