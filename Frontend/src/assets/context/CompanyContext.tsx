import { ReactNode, createContext, useContext } from 'react';
import { Company, Hotel } from '../../types';


const exampleUser: Company = {
  username: "john_doe",
  email: "john.doe@example.com",
  company: "Doe Enterprises",
  password: "securepassword123",
  phonenumber: 1234567890,
  website: "https://www.doeenterprises.com",
  observerdHotels: new Map<string, Hotel>([
    ["Hotel1", {
      id: "Hotel1",
      name: "Lakeside Lodge",
      hotelDataId: "60f8d5a2c2b5b814c8b7b44b",
      currentPrice: 140,
      priceInOneMonth: 150,
      date: "2023-05-28T00:00:00Z"
    }],
    ["Hotel2", {
      id: "Hotel2",
      name: "Mountain Retreat",
      hotelDataId: "60f8d5a2c2b5b814c8b7b44c",
      currentPrice: 230,
      priceInOneMonth: 240,
      date: "2023-05-28T00:00:00Z"
    }],
    ["Hotel3", {
      id: "Hotel3",
      name: "Beachside Inn",
      hotelDataId: "60f8d5a2c2b5b814c8b7b44d",
      currentPrice: 130,
      priceInOneMonth: 140,
      date: "2023-05-28T00:00:00Z"
    }],
    ["Hotel4", {
      id: "Hotel4",
      name: "City Center Hotel",
      hotelDataId: "60f8d5a2c2b5b814c8b7b44e",
      currentPrice: 210,
      priceInOneMonth: 220,
      date: "2023-05-28T00:00:00Z"
    }],
    ["Hotel5", {
      id: "Hotel5",
      name: "Riverside Resort",
      hotelDataId: "60f8d5a2c2b5b814c8b7b44f",
      currentPrice: 180,
      priceInOneMonth: 190,
      date: "2023-05-28T00:00:00Z"
  }],
  ["Hotel6", {
      id: "Hotel6",
      name: "Forest Cabin",
      hotelDataId: "60f8d5a2c2b5b814c8b7b450",
      currentPrice: 120,
      priceInOneMonth: 130,
      date: "2023-05-28T00:00:00Z"
  }],
  ["Hotel7", {
      id: "Hotel7",
      name: "Luxury Villa",
      hotelDataId: "60f8d5a2c2b5b814c8b7b451",
      currentPrice: 350,
      priceInOneMonth: 360,
      date: "2023-05-28T00:00:00Z"
  }],
  ["Hotel8", {
      id: "Hotel8",
      name: "Seaside Resort",
      hotelDataId: "60f8d5a2c2b5b814c8b7b452",
      currentPrice: 200,
      priceInOneMonth: 210,
      date: "2023-05-28T00:00:00Z"
  }],
  ["Hotel9", {
      id: "Hotel9",
      name: "Historic Inn",
      hotelDataId: "60f8d5a2c2b5b814c8b7b453",
      currentPrice: 160,
      priceInOneMonth: 170,
      date: "2023-05-28T00:00:00Z"
  }],
  ["Hotel10", {
      id: "Hotel10",
      name: "Ski Chalet",
      hotelDataId: "60f8d5a2c2b5b814c8b7b454",
      currentPrice: 280,
      priceInOneMonth: 290,
      date: "2023-05-28T00:00:00Z"
  }],
  ["Hotel11", {
      id: "Hotel11",
      name: "Desert Oasis",
      hotelDataId: "60f8d5a2c2b5b814c8b7b455",
      currentPrice: 190,
      priceInOneMonth: 200,
      date: "2023-05-28T00:00:00Z"
  }],
  ["Hotel12", {
      id: "Hotel12",
      name: "Mountain Lodge",
      hotelDataId: "60f8d5a2c2b5b814c8b7b456",
      currentPrice: 250,
      priceInOneMonth: 260,
      date: "2023-05-28T00:00:00Z"
  }]
  ]),
  settings: {
    darkMode: true,
    hotelColors: new Map<string, string>([
      ["Lakeside Lodge", "#FF5733"],
      ["Mountain Retreat", "#33FF57"],
      ["Beachside Inn", "#3375FF"],
      ["City Center Hotel", "#FF33A5"]
    ]),
    viewInDashboard: "overview"
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  sixDigitCode: Math.random().toString().slice(2, 8)
};

  
  // Erstelle den Kontext und initialisiere ihn mit exampleUser
  const CompanyContext = createContext<Company>(exampleUser);
  
  // Erstelle den Provider
  export const CompanyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
      <CompanyContext.Provider value={exampleUser}>
        {children}
      </CompanyContext.Provider>
    );
  };
  
  // Hook zum Verwenden des Kontextes
  export const useCompany = () => {
    const context = useContext(CompanyContext);
    if (!context) {
      throw new Error('useCompany must be used within a CompanyProvider');
    }
    return context;
  };