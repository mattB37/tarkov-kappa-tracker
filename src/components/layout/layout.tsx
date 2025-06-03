import Header from '../header/header';
import Footer from '../footer/footer';
import { type ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode,
}

export const Layout: React.FC<LayoutProps> = (props) => {
    const { children } = props;
    return (
        <div data-testid='layout-container' className="flex flex-column items-center w-100 h-100">
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;