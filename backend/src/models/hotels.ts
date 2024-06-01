import mongoose from "mongoose";
 

interface Hotel {
    name: string;
    stars: number;
    breakfastIncluded: boolean; 
    pricePerNight: number;
    pricePerNightFuture: number;
}

const exampleHotel: Hotel = {
    name: "Hotel Beispiel",
    stars: 4,
    breakfastIncluded: true,
    pricePerNight: 120.50,
    pricePerNightFuture: 80.50
};

const hotelSchema = new mongoose.Schema({
  name: {type: 'string',required: true},
  stars: {type: 'number',required: true},
  breakfastIncluded: {type: 'boolean',required: true},
  pricePerNight: {type: 'number',required: true},
  pricePerNightFuture: {type: 'number',required: true},
},
{collection:"HOTELS"}
);

console.log(exampleHotel);