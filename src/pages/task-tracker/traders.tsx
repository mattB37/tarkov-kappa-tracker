import TherapistImg from "../../assets/trader_images/therapist.webp";
import PraporImg from "../../assets/trader_images/therapist.webp";
import SkierImg from "../../assets/trader_images/skier.webp";
import MechanicImg from "../../assets/trader_images/mechanic.webp";
import JaegerImg from "../../assets/trader_images/jaeger.webp";
import PeacekeeperImg from "../../assets/trader_images/peacekeeper.webp";
import RagmanImg from "../../assets/trader_images/ragman.webp";
import FenceImg from "../../assets/trader_images/fence.webp";

interface TradersProps {
    traderNames: string[]
    setSelectedTrader: React.Dispatch<React.SetStateAction<string>>
    selectedTrader: string,
}

type TraderToImage = {
    [key: string]: string;
}

const traderNameToImagePath: TraderToImage = {
    "Therapist": TherapistImg,
    "Prapor": PraporImg,
    "Skier": SkierImg,
    "Mechanic": MechanicImg,
    "Jaeger": JaegerImg,
    "Peacekeeper": PeacekeeperImg,
    "Ragman": RagmanImg,
    "Fence": FenceImg,
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