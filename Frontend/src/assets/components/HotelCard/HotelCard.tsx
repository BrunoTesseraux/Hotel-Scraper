// HotelCard.tsx
import React from 'react';
import { Hotel } from '../../../types';


const HotelCard: React.FC<Hotel> = ({ id, name, hotelDataId }) => {
  return (
    <div className="hotel-card">
      <h3>{name}</h3>
      <p>Hotel ID: {id}</p>
      <p>Hotel Data ID: {hotelDataId}</p>
    </div>
  );
};

export default HotelCard;