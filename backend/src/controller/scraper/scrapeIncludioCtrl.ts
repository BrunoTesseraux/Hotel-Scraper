import { Request, Response } from 'express';
import { ScraperService } from '../../service/index';

export const scrapeIncludioCtrl = {
    async scrape(req: Request, res: Response) {

        try {
            const hotelDetails = {
                name: req.body.name,
                stars: req.body.stars,
                roomTypes: req.body.roomTypes,
                breakfastIncluded: req.body.breakfastIncluded
            };
            console.log(hotelDetails);
            // Rufe die Methode scrapeAndSave direkt aus dem ScraperService auf
            const savedData = await ScraperService.getIncludio.scrapeAndSave(hotelDetails);
            res.json({ data: savedData });
        } catch (error) {
            // console.error(error); @BrunoTesseraux @NikolaSretko log für debugging
            res.status(500).json({ error: 'Fehler beim Scrapen der Website' });
        }
    }
};