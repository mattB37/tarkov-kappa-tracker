import Header from "../header";
import {type ReactNode} from 'react';

type LayoutProps = {
    children: ReactNode,
}

export const Layout: React.FC<LayoutProps> = (props) => {
    const {children} = props;
    return (
        <div data-testid='layout-container' className="flex flex-column items-center">
            <Header/>
            <div>
                {children}
            </div>
        </div>
    );
}

export default Layout;