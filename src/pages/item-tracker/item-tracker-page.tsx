import { Layout } from '../../components';
import '../../index.css';
import { ItemTracker } from './item-tracker';
import data from '../../data/filtered_item_data.json';
import type { SimpleItem } from '../../scripts/types';
import { LOCAL_STORAGE_KEY } from './constants';

export const ItemTrackerPage: React.FC = () => {
    const items = data as SimpleItem[];

    const handleResetItemTracking = () => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(new Array(items.length).fill(0)));
        window.location.href = window.location.href
    }

    return (
        <Layout>
            <h1 className="mb2">Kappa Item Tracker</h1>
            <div className='flex flex-column mb2 f5 tc'>
                <div>Found in raid items marked with <span className='red'>*FIR</span></div>
                <div>Item counts are automatically saved to browser local storage</div>
            </div>
            <div className="ml2 mr2 mb2">
                <button onClick={handleResetItemTracking}>Reset Tracking</button>
            </div>
            <ItemTracker itemData={items} />
        </Layout>
    );
};

export default ItemTrackerPage;