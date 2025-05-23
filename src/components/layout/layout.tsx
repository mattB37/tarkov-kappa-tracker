import Header from "../header";

export const Layout: React.FC = () => {
    return (
        <div data-testid='layout-container' className="flex flex-column items-center">
            <Header/>
            <h1>Vite + React</h1>
            <div className="card">
                <p>
                Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    );
}

export default Layout;