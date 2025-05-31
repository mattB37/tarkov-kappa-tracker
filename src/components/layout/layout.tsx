import Header from "../header";
import Footer from "../footer";
import { type ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode,
}

export const Layout: React.FC<LayoutProps> = (props) => {
    const { children } = props;
    return (
        <div data-testid='layout-container' className="flex flex-column items-center w-100 h-100">
            <Header />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;