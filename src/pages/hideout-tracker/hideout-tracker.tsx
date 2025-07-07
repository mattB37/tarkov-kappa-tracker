import { useEffect, useMemo, useRef } from "react";
import { LOCAL_STORAGE_KEY } from "./constants";
import { HideoutItem } from './hideout-item';
import useResponsiveView from "../../hooks/useResponsiveView";
import classNames from "classnames";
import type { CustomHideoutStationRequirements } from "../../scripts/types";
import "../../index.css"

interface ItemTrackerProps {
    hideoutData: CustomHideoutStationRequirements[];
}

export const HideoutTracker: React.FC<ItemTrackerProps> = ({ hideoutData }) => {
    const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const initialItemCounts: number[] = useMemo(() => {
        return (new Array(hideoutData.reduce((acc, val) => { return (acc + val.itemReqs.length) }, 0))).fill(0);
    }, [hideoutData]);
    const startingCounts = localStorageData ? JSON.parse(localStorageData) : initialItemCounts;
    const isMobile = useResponsiveView();

    const stationRefs = useRef<HTMLDivElement[]>([]);
    const buttonRef = useRef<HTMLDivElement>(null);
    const handleScrollToStation = (index: number) => {
        stationRefs.current[index]?.scrollIntoView({
            behavior: "auto"
        });
    };
    const handleBackToTop = () => {
        buttonRef.current?.scrollIntoView({
            behavior: "auto",
        });
    };

    const handleResetItemTracking = () => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialItemCounts));
        window.location.reload();
    }

    useEffect(() => {
        try {
            if (!localStorageData) {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(startingCounts));
            }
        } catch (error) {
            console.error('Error saving default data to local storage:', error);
        }
    }, []);

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

    let half: number | undefined;
    let firstColumnData: CustomHideoutStationRequirements[] | undefined;
    let secondColumnData: CustomHideoutStationRequirements[] | undefined;
    let secondColumnOffset: number | undefined;
    if (!isMobile) {
        half = Math.ceil(hideoutData.length / 2);
        firstColumnData = hideoutData.slice(0, half);
        secondColumnData = hideoutData.slice(half);
        secondColumnOffset = firstColumnData.length;
    }
    const renderColumn = (data: CustomHideoutStationRequirements[], indexOffset: number) => {
        return data.map((station, rowIndex) => {
            return (
                <div key={station.id} className="tc ba br1 b--white ml1 mr1 mb3">
                    <div className="flex flex-wrap items-center">
                        <img style={{ height: "50px", width: "50px" }} src={station.imageLink} alt={`image of ${station.name}`}></img>
                        <div ref={el => { if (el) { stationRefs.current[rowIndex + indexOffset] = el } }} className="f4">{station.name}</div>
                        <div><button className="bg-transparent bn underline f5 white" onClick={handleBackToTop}>Back to Top</button></div>
                    </div>
                    <div className="list pa0 ma0 flex flex-wrap">
                        {station.itemReqs.map((req, colIndex) => (
                            <li key={req.id}>
                                <HideoutItem
                                    startingCount={startingCounts[station.itemReqs.length * (rowIndex + indexOffset) + colIndex] ?? 0}
                                    index={station.itemReqs.length * (rowIndex + indexOffset) + colIndex}
                                    neededCount={req.count}
                                    item={req}
                                    handleUpdateLocalStorageData={handleUpdateLocalStorageData}
                                />
                            </li>
                        ))}
                    </div>
                </div>
            );
        });
    };

    return (
        <>
            <div className='flex flex-column mb2 f5 tc'>
                <div>For the upcoming hardcore wipe hideout items will not need to be found in raid (TBD)</div>
                <div className="strike">All hideout items need to be found in raid as of patch 0.16 on 12/25/2024</div>
                <div>Item counts are automatically saved to browser local storage</div>
            </div>
            <div className="ml2 mr2 mb2 justify-center">
                <button className="base-btn" onClick={handleResetItemTracking}>Reset Tracking</button>
            </div>
            <div className="tc mb2 b">
                Click The Icons to Jump to a Specific Hideout Station
                <div ref={el => { if (el) buttonRef.current = el }} className="flex flex-wrap justify-center list">
                    {hideoutData.map((station, index) => {
                        return (
                            <li key={station.id}>
                                <a className="bg-transparent bn pa1 pointer" onClick={() => { handleScrollToStation(index) }}>
                                    <img style={isMobile ? { height: "30px", width: "30px" } : { height: "50px", width: "50px" }} src={station.imageLink}></img>
                                </a>
                            </li>
                        )
                    })}
                </div>
            </div>
            <div className={classNames("w-100",
                { "mr3 ml3": !isMobile },
                { "ml2": isMobile }
            )}>
                {isMobile ? (
                    renderColumn(hideoutData, 0)
                ) : firstColumnData && secondColumnData && secondColumnOffset ? (
                    <div className="flex flex-row">
                        <div>
                            {renderColumn(firstColumnData, 0)}
                        </div>
                        <div>
                            {renderColumn(secondColumnData, secondColumnOffset)}
                        </div>
                    </div>
                ) : <div>Error occured</div>}
            </div>
        </>
    );
}

export default HideoutTracker;