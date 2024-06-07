import { useCompany } from "../../context/CompanyContext";
import { Hotel } from '../../../types';
import "./TagesTabelle.scss";

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`;
};

const TagesTabelle: React.FC = () => {
    
    const company = useCompany();
    const hotels = Array.from(company.observerdHotels.values()) as Hotel[]; // Convert Map to Array and specify the type

    const chunkSize = 8;
    const hotelChunks: Hotel[][] = [];
    for (let i = 0; i < hotels.length; i += chunkSize) {
        hotelChunks.push(hotels.slice(i, i + chunkSize));
    }

    // Render the headline outside of the loop
    const firstChunk = hotelChunks[0];
    const headlineDate = firstChunk ? formatDate(firstChunk[0].date) : '';

    return (
        <div className="tagestabelle">
            <h1>Your prices for {headlineDate}</h1>
            {hotelChunks.map((chunk, index) => (
                <div key={index}>
                    <table>
                        <thead>
                            <tr>
                                <th>Hotel</th>
                                {chunk.map((hotel: Hotel) => (
                                    <th key={hotel.id}>{hotel.name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Current Price</td>
                                {chunk.map((hotel: Hotel) => (
                                    <td key={hotel.id}>{hotel.currentPrice}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Price in One Month</td>
                                {chunk.map((hotel: Hotel) => (
                                    <td key={hotel.id}>{hotel.priceInOneMonth}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default TagesTabelle;