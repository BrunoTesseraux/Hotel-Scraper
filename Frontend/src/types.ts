
export interface Hotel {
  id: string;
  name: string;
  hotelDataId: string;
  currentPrice: number;
  priceInOneMonth: number;
  date: string;
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

  export interface Settings {
    darkMode: boolean;
    hotelColors: Map<string, string>;
    viewInDashboard: string;
  }
  
  export interface Company {
    username: string;
    email: string;
    company: string;
    password: string;
    phonenumber: number;
    website?: string;
    observerdHotels: Map<string, Hotel>;
    settings: Settings;
    createdAt: Date;
    updatedAt: Date;
    sixDigitCode: string;
  }
  