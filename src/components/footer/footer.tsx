export const Footer: React.FC = () => {
    return (
        <div className="flex-column bg-black tc text center pa2 w-100 f7 bottom-0">
            <div>
                The code for this project is freely available on <a className="underline-hover" href="https://github.com/mattB37/tarkov-kappa-tracker">GitHub</a> | Big thanks to <a className="underline-hover" href="https://tarkov.dev">Tarkov.dev</a> and <a className="underline-hover" href="https://escapefromtarkov.fandom.com/wiki/Escape_from_Tarkov_Wiki">The Official Escape From Tarkov Wiki</a>
            </div>
            <div className="mt2">
                Game content and materials are trademarks and copyrights of Battlestate Games and its licensors. All rights reserved.
            </div>
        </div>
    )
}

export default Footer;