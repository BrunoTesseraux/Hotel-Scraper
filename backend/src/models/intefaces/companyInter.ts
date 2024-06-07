import { Schema, model, Document, Model } from 'mongoose';

// Settings Interface
interface Settings {
  darkMode: boolean;
  hotelColors: Map<string, string>;
  viewInDashboard: string;
}

// CompanyDocument Interface
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

// CompanyModel Interface
interface CompanyModel extends Model<CompanyDocument> {
  findByEmail: (email: string) => Promise<CompanyDocument | null>;
}

// Schema definieren
const companySchema = new Schema<CompanyDocument>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  password: { type: String, required: true },
  phonenumber: { type: Number, required: true },
  website: { type: String },
  observerdHotels: { type: Map, of: String },
  settings: {
    darkMode: { type: Boolean, required: true },
    hotelColors: { type: Map, of: String },
    viewInDashboard: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// toProfileInfo Methode
companySchema.methods.toProfileInfo = function () {
  return {
    username: this.username,
    email: this.email,
    company: this.company,
    Idqrcode: '', // Hier kannst du die Logik hinzufügen, um den QR-Code zu generieren
    phonenumber: this.phonenumber,
    website: this.website,
    _id: this._id,
    observerdHotels: this.observerdHotels,
    settings: this.settings,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

// findByEmail Methode
companySchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email });
};

// Modell erstellen
const Company = model<CompanyDocument, CompanyModel>('Company', companySchema);

export { Company, CompanyDocument, CompanyModel, Settings };