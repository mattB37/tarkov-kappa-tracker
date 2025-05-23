import {type HeaderLink, HEADERLINKS} from './constants'
import useResponsiveView from '../../hooks/useResponsiveView';
import classNames from 'classnames';

export const Header: React.FC = () => {
    const isMobile = useResponsiveView();
    return (
        <div data-testid='header-container' className='top-0 w-100 bg-mid-gray pa1  '>
            <header className={classNames("flex mv1 f4", {"f6": isMobile})}>
                <ul className={classNames("flex tc items-center ph0 mh0 mv0", {"h1": isMobile})}>
                    <div className={classNames("flex br-pill bg-gold", {"pa1": !isMobile})}>
                        <a href="" className="flex items-center">
                            <img style={isMobile ? {height:"20px", width:"25px"} : {height:"40px", width:"50px"}} src="src/assets/KappaContainer.webp" alt="kappa container"/>
                            <p className={classNames("no-underline mid-gray pl1 pr2 ma0")}>Tracker</p>
                        </a>
                    </div>
                    {HEADERLINKS.map((headerLink:HeaderLink) => 
                        <a key={headerLink.name} href={headerLink.href} className={classNames("white ml2", {"pa2": !isMobile})}>{headerLink.name}</a>
                    )}
                </ul>
            </header>
        </div>
    );
}

export default Header;