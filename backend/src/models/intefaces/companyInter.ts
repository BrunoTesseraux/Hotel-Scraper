import { Document, Model } from 'mongoose';

interface Settings {
  darkMode: boolean;
  hotelColors: Map<string, string>;
  viewInDashboard: string;
}

interface CompanyDocument extends Document {
  username: string;
  email: string;
  company: string;
  password: string;
  phonenumber: number;
  website?: string;
  observerdHotels: Map<string, string>;
  settings: Settings;
  createdAt: Date;
  updatedAt: Date;
  sixDigitCode: string;
  toProfileInfo: () => {
    username: string;
    email: string;
    company: string;
    Idqrcode: string;
    phonenumber: number;
    website?: string;
    _id: string;
    observerdHotels: Map<string, string>;
    settings: Settings;
    createdAt: Date;
    updatedAt: Date;
    sixDigitCode: string;
  };
}

interface CompanyModel extends Model<CompanyDocument> {
  findByEmail: (email: string) => Promise<CompanyDocument | null>;
}

export { CompanyDocument, CompanyModel, Settings };