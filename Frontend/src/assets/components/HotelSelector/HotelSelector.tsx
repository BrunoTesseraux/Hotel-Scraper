import { useEffect, useState } from "react"
import "./HotelSelector.scss"
import { Hotel } from "../../../types";
import HotelCard from "./../HotelCard/HotelCard";



const HotelSelector: React.FC = () => {
    //test usestate
    const [hotels, setHotels] = useState<Hotel[]>([
        {
          "id": "1",
          "name": "Grand Hotel",
          "hotelDataId": "GH123"
        },
        {
          "id": "2",
          "name": "Ocean View Resort",
          "hotelDataId": "OVR456"
        },
        {
          "id": "3",
          "name": "Mountain Retreat",
          "hotelDataId": "MR789"
        },
        {
          "id": "4",
          "name": "City Center Inn",
          "hotelDataId": "CCI012"
        },
        {
          "id": "5",
          "name": "Lakeside Lodge",
          "hotelDataId": "LL345"
        }
      ]);
        // Test datensatz zur preisdarstellng
    //   {
    //     "_id": "60f8d5a2c2b5b814c8b7b44b",
    //     "hotel": "60f8d5a2c2b5b814c8b7b44a",
    //     "breakfastIncluded": true,
    //     "stars": 4,
    //     "prices": [
    //       {
    //         "currentPrice": 120,
    //         "priceInOneMonth": 130,
    //         "dateOfRequest": "2023-05-22T00:00:00Z"
    //       },
    //       {
    //         "currentPrice": 125,
    //         "priceInOneMonth": 135,
    //         "dateOfRequest": "2023-05-23T00:00:00Z"
    //       },
    //       {
    //         "currentPrice": 130,
    //         "priceInOneMonth": 140,
    //         "dateOfRequest": "2023-05-24T00:00:00Z"
    //       },
    //       {
    //         "currentPrice": 128,
    //         "priceInOneMonth": 138,
    //         "dateOfRequest": "2023-05-25T00:00:00Z"
    //       },
    //       {
    //         "currentPrice": 132,
    //         "priceInOneMonth": 142,
    //         "dateOfRequest": "2023-05-26T00:00:00Z"
    //       },
    //       {
    //         "currentPrice": 135,
    //         "priceInOneMonth": 145,
    //         "dateOfRequest": "2023-05-27T00:00:00Z"
    //       },
    //       {
    //         "currentPrice": 140,
    //         "priceInOneMonth": 150,
    //         "dateOfRequest": "2023-05-28T00:00:00Z"
    //       }
    //     ]
    //   }

    useEffect(() => {
        const fetchHotels = async () => {
          try {
            const response = await fetch('/api/hotels');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            //data mit dem typ hotel
            const data: Hotel[] = await response.json();
            setHotels(data);
          } catch (error) {
            console.error('Error fetching hotels:', error);
          }
        };
    
        fetchHotels();
      }, []);

    return (
        <div className="hotel-selector">
            <h2>Hotel Selector</h2>
            <div className="hotel-cards">
                {hotels.map(hotel => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                ))}
            </div>
        </div>
    )
}

export default HotelSelector;