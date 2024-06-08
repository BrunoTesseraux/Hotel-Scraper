import { Request, Response } from 'express';
import { ScraperService } from '../../service/index';

export const scrapeIncludioCtrl = {
    async scrape(req: Request, res: Response) {
        try {
            // Scrape data from the service
            const scrapedHotelData = await ScraperService.getIncludio.scrapeAndReturn();

            // Fill additional details as needed
            const hotelData = {
                ...scrapedHotelData,
                name: req.body.name || "Default Hotel Name",
                stars: req.body.stars || "Default Stars",
                roomTypes: req.body.roomTypes || ["Default Room Type"],
                breakfastIncluded: req.body.breakfastIncluded || false
            };

            console.log("Hotel-Details", hotelData);

            // Save to database
            const savedHotel = await ScraperService.postIncludio.post(hotelData);

            res.json({ data: savedHotel });
        } catch (error) {
            const typedError = error as Error;
            console.error('Fehler beim Scrapen der Website:', typedError);
            res.status(500).json({ error: 'Fehler beim Scrapen der Website', details: typedError.message });
        }
    }
};