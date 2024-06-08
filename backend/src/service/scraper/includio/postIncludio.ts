// src/service/includio/postIncludio.ts
import HotelModel from '../../../models/Hotel';
import { HotelDetails } from './icludioInterfaces';

export const postIncludio = {
    async post(hotelData: HotelDetails): Promise<HotelDetails> {
        try {
            // Direktes Erstellen und Speichern des Hotels
            const hotel = new HotelModel(hotelData);
            const savedHotel = await hotel.save();
            return savedHotel as unknown as HotelDetails;
        } catch (error) {
            const typedError = error as Error;
            console.error('Fehler beim Speichern der Daten in der Datenbank:', typedError);
            throw new Error('Speichern der Daten in der Datenbank fehlgeschlagen: ' + typedError.message);
        }
    }
};