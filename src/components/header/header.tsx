import { type HeaderLink, HEADERLINKS } from './constants'
import useResponsiveView from '../../hooks/useResponsiveView';
import classNames from 'classnames';

export const Header: React.FC = () => {
    const isMobile = useResponsiveView();
    return (
        <div data-testid='header-container' className='top-0 w-100 bg-mid-gray pa2'>
            <header className={classNames("flex mv1 f3", { "f4": isMobile })}>
                <ul className={classNames("flex tc items-center ph0 mh0 mv0 list", { "h1": isMobile })}>
                    <li className={classNames("flex br-pill bg-gold", { "pa1": !isMobile })}>
                        <a href="/" className="flex items-center hover-black no-underline mid-gray pl1 pr2 ma0">
                            <img style={isMobile ? { height: "25px", width: "30px" } : { height: "40px", width: "50px" }} src="src/assets/KappaContainer.webp" alt="kappa container" />
                            Tracker
                        </a>
                    </li>
                    {HEADERLINKS.map((headerLink: HeaderLink) =>
                        <li key={headerLink.name}>
                            <a href={headerLink.href} className={classNames("white hover-black ml2", { "pa2": !isMobile })}>{headerLink.name}</a>
                        </li>
                    )}
                </ul>
            </header>
        </div>
    );
}

export default Header;