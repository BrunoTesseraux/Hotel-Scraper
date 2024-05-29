
export interface Hotel {
    id: string;
    name: string;
    hotelDataId: string;
  }
  
  export interface PriceData {
    currentPrice: number;
    currentPriceDateOfRequest: string;
    priceInOneMonth: number;
    priceInOneMonthDateOfRequest: string;
  }
  
  export interface HotelData {
    hotelId: string;
    breakfastIncluded: boolean;
    stars: number;
    prices: PriceData[];
  }