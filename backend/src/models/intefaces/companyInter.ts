import { Document } from 'mongoose';
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

export {Document,Hotel}