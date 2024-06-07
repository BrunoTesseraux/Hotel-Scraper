import { Request, Response } from 'express';
import { ScraperService } from '../../service/index';
import HotelModel from '../../models/Hotel';

export const scrapeIncludioCtrl = {
    async scrape(req: Request, res: Response) {
        try {
            // Scrape data from the service
            const hotelData = await ScraperService.getIncludio.scrapeAndReturn();

            // Fill additional details as needed
            hotelData.name = req.body.name || "Default Hotel Name";
            hotelData.stars = req.body.stars || "Default Stars";
            hotelData.roomTypes = req.body.roomTypes || ["Default Room Type"];
            hotelData.breakfastIncluded = req.body.breakfastIncluded || false;

            console.log("Hotel-Details", hotelData);

            // Save to database
            const hotel = new HotelModel(hotelData);
            await hotel.save();

            res.json({ data: hotel });
        } catch (error) {
            const typedError = error as Error;
            console.error('Fehler beim Scrapen der Website:', typedError);
            res.status(500).json({ error: 'Fehler beim Scrapen der Website', details: typedError.message });
        }
    }
};