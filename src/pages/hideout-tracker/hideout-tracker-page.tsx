import { Layout } from '../../components'
import data from '../../data/filtered_hideout_data.json';
import { HideoutTracker } from './hideout-tracker'
import '../../index.css'

export const HideoutTrackerPage: React.FC = () => {
    return (
        <Layout>
            <h1>Tarkov Hideout Tracker</h1>
            <HideoutTracker hideoutData={data} />
        </Layout>
    );
};

export default HideoutTrackerPage;