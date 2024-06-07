import mongoose, { Document } from 'mongoose';

// TypeScript Interfaces
interface PricePerNight {
  typ: string;
  price: string;
  date: Date;
}

interface Hotel extends Document {
  name: string;
  stars: string;
  roomTypes: string[];
  breakfastIncluded: boolean; 
  pricePerNight: PricePerNight[];
  pricePerNightFuture: PricePerNight[];
}

// Mongoose Schema Definition
const pricePerNightSchema = new mongoose.Schema({
  typ: { type: String, required: true },
  price: { type: String, required: true },
  date: { type: Date, required: true }
});

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stars: { type: String, required: true },
  roomTypes: { type: [String], required: true },
  breakfastIncluded: { type: Boolean, required: true },
  pricePerNight: { type: [pricePerNightSchema], required: true },
  pricePerNightFuture: { type: [pricePerNightSchema], required: true }
}, 
{
  collection: "HOTELS"
});

// Exporting the Model
const HotelModel = mongoose.model<Hotel>('Hotel', hotelSchema);
export default HotelModel;