import { Request, Response } from 'express';
import { scrapeRoomPrices } from '../../service/scraperService'

export const startScraping = async (req: Request, res: Response): Promise<void> => {
    const { site } = req.body;
    try {
        const data = await scrapeRoomPrices(site);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Scraping failed', error });
    }
};