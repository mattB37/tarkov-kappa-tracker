import { Layout } from '../../components'
import '../../index.css'

export const HomePage: React.FC = () => {
    return (
        <Layout>
            <h1 className="tc mb0">Welcome to Tarkov Tracker</h1>
            <div className='ml5 mr5 tc f3'>
                <p>
                    The site data was last updated for patch 0.16 on 06/05/2025.
                </p>
                <p>
                    This project was possible because of the hard work by people from <a href="https://tarkov.dev">Tarkov.dev</a> and <a href="https://escapefromtarkov.fandom.com/wiki/Escape_from_Tarkov_Wiki">The EFT Wiki</a>. All of the data came from the Tarkov.dev GraphQL API which is freely available <a href="https://tarkov.dev/api/">here</a>. Feel free to <a href="https://opencollective.com/tarkov-dev">Donate</a> to keep the Tarkov.dev site running.
                </p>
                <p>
                    The website was made with TS + Vite + React + React Router and is hosted on GitHub pages. The code is available on <a href='https://github.com/mattB37/tarkov-kappa-tracker'>GitHub</a>.
                </p>
                <p>
                    The dat for all the trackers comes from the Tarkov.dev API so when there is a wipe or patch it will be easily updated.
                </p>
                <p>
                    If you find any issues or have any ideas to improve the website feel free to contribute or post an issue on GitHub.
                </p>
                <p>
                    I made this website because I was bored. Not sure how useful it is but maybe the website will help some folks out.
                </p>
                <p>
                    All the tracking info is stored in the browsers local storage so the data won't persist in incognito mode.
                </p>
                <p>
                    If you are still reading this --- have a nice day.
                </p>
            </div>
        </Layout>
    );
};

export default HomePage;