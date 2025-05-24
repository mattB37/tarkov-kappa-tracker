import Layout from '../../components/layout'
import '../../index.css'

export const HomePage:React.FC = () => {
    return (
        <Layout>
            <h1>This is the homepage</h1>
            <div className="card">
                <p>
                Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </Layout>
    );
};

export default HomePage;