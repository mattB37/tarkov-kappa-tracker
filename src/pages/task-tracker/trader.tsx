interface TraderProps {
    traderName: string,
    traderImagePath: string,
    setSelectedTrader: React.Dispatch<React.SetStateAction<string>>
    selectedTrader: string,
}

export const Trader: React.FC<TraderProps> = (props) => {
    const { traderName, traderImagePath, setSelectedTrader, selectedTrader } = props;
    return (
        <button className="bn pointer pa1" onClick={() => { setSelectedTrader(traderName); }}>
            <img className={selectedTrader !== traderName ? "o-40" : undefined} src={traderImagePath} alt={`image of ${traderName}`} />
        </button>
    );
}