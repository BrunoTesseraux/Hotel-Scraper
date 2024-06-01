
export interface Hotel {
    id: string;
    name: string;
    hotelDataId: string;
  }
  
  export interface PriceData {
    currentPrice: number;
    priceInOneMonth: number;
    dateOfRequest: string;
  }
  
  export interface HotelData {
    _id: string;
    hotel: string;
    breakfastIncluded: boolean;
    stars: number;
    prices: PriceData[];
  }