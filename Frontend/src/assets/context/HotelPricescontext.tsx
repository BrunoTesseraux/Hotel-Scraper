import React, { createContext, useContext, ReactNode, useState } from 'react';

// Define the type for a single price entry
interface Price {
  currentPrice: number;
  priceInOneMonth: number;
  dateOfRequest: string;
}

// Define the type for a hotel entry
interface HotelData {
  _id: string;
  hotel: string;
  breakfastIncluded: boolean;
  stars: number;
  prices: Price[];
  currentPriceColor?: string; // New property to store current price color
  priceInOneMonthColor?: string; // New property to store price in one month color
}

// Define the context type
interface HotelContextType {
  hotelData: HotelData[];
  setHotelData: React.Dispatch<React.SetStateAction<HotelData[]>>; // Setter function
}

// Create the context with a default value
const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const useHotelContext = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotelContext must be used within a HotelProvider');
  }
  return context;
};

interface HotelProviderProps {
  children: ReactNode;
}

// Define the hotel data
const dummyHotelData: HotelData[] = [
  {
    _id: "60f8d5a2c2b5b814c8b7b44b",
    hotel: "Lakeside Lodge",
    breakfastIncluded: true,
    stars: 4,
    prices: [
      { currentPrice: 120, priceInOneMonth: 130, dateOfRequest: "2023-05-22T00:00:00Z" },
      { currentPrice: 125, priceInOneMonth: 135, dateOfRequest: "2023-05-23T00:00:00Z" },
      { currentPrice: 130, priceInOneMonth: 140, dateOfRequest: "2023-05-24T00:00:00Z" },
      { currentPrice: 128, priceInOneMonth: 138, dateOfRequest: "2023-05-25T00:00:00Z" },
      { currentPrice: 132, priceInOneMonth: 142, dateOfRequest: "2023-05-26T00:00:00Z" },
      { currentPrice: 135, priceInOneMonth: 145, dateOfRequest: "2023-05-27T00:00:00Z" },
      { currentPrice: 140, priceInOneMonth: 150, dateOfRequest: "2023-05-28T00:00:00Z" },
    ],
  },
  {
    _id: "60f8d5a2c2b5b814c8b7b44c",
    hotel: "Mountain Retreat",
    breakfastIncluded: false,
    stars: 5,
    prices: [
      { currentPrice: 200, priceInOneMonth: 210, dateOfRequest: "2023-05-22T00:00:00Z" },
      { currentPrice: 205, priceInOneMonth: 215, dateOfRequest: "2023-05-23T00:00:00Z" },
      { currentPrice: 210, priceInOneMonth: 220, dateOfRequest: "2023-05-24T00:00:00Z" },
      { currentPrice: 215, priceInOneMonth: 225, dateOfRequest: "2023-05-25T00:00:00Z" },
      { currentPrice: 220, priceInOneMonth: 230, dateOfRequest: "2023-05-26T00:00:00Z" },
      { currentPrice: 225, priceInOneMonth: 235, dateOfRequest: "2023-05-27T00:00:00Z" },
      { currentPrice: 230, priceInOneMonth: 240, dateOfRequest: "2023-05-28T00:00:00Z" },
    ],
  },
];

// Create a provider component
export const HotelProvider: React.FC<HotelProviderProps> = ({ children }) => {
  const [hotelData, setHotelData] = useState<HotelData[]>(dummyHotelData);

  return (
    <HotelContext.Provider value={{ hotelData, setHotelData }}>
      {children}
    </HotelContext.Provider>
  );
};