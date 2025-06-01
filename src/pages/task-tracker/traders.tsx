interface TradersProps {
    traderNames: string[]
    setSelectedTrader: React.Dispatch<React.SetStateAction<string>>
    selectedTrader: string,
}

type TraderToImage = {
    [key: string]: string;
}

const traderNameToImagePath: TraderToImage = {
    "Therapist": 'src/assets/trader_images/therapist.webp',
    "Prapor": 'src/assets/trader_images/prapor.webp',
    "Skier": 'src/assets/trader_images/skier.webp',
    "Mechanic": 'src/assets/trader_images/mechanic.webp',
    "Jaeger": 'src/assets/trader_images/jaeger.webp',
    "Peacekeeper": 'src/assets/trader_images/peacekeeper.webp',
    "Ragman": 'src/assets/trader_images/ragman.webp',
    "Fence": 'src/assets/trader_images/fence.webp',
}

export const Traders: React.FC<TradersProps> = (props) => {
    const { traderNames, setSelectedTrader, selectedTrader } = props;
    return (
        traderNames.map((traderName) => {
            return (
                <li key={traderName}>
                    <button className="bn pointer pa1" onClick={() => { setSelectedTrader(traderName); }}>
                        <img className={selectedTrader !== traderName ? "o-40" : undefined} src={traderNameToImagePath[traderName]} alt={`image of ${traderName}`} />
                    </button>
                </li>
            );
        })
    );
}