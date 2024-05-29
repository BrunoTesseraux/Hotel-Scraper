import "./HotelCard.scss"
import { Hotel, HotelData } from "../../../types";

const HotelCard: React.FC<{ hotel: Hotel }> = ({hotel}) => {
    return (
        <div className="hotel-card">
            <button>Hotel {hotel.name}</button>
        </div>
    )
}

export default HotelCard;