// src/scheduler.ts
import cron from 'node-cron';
import { ScraperService } from './service';
import {HotelDetails} from './service/scraper/includio/icludioInterfaces';

const scheduleScraping = () => {

    const times = ['0 4 * * *', '0 18 * * *'];

    times.forEach(time => {
        cron.schedule(time, async () => {
            try {
                console.log(`Running scraping job at ${new Date()}`);

                // Scrape data from the service
                const scrapedHotelData = await ScraperService.getIncludio.scrapeAndReturn();

                // Fill additional details as needed
                const hotelData: HotelDetails = {
                    ...scrapedHotelData,
                    name: "Automated Scrape",
                    stars: "Automated Stars",
                    roomTypes: ["Automated Room Type"],
                    breakfastIncluded: true
                };

                console.log("Automated Hotel-Details", hotelData);

                // Save to database via the service
                const savedHotel = await ScraperService.postIncludio.post(hotelData);

                console.log(`Hotel data saved: ${savedHotel}`);
            } catch (error) {
                const typedError = error as Error;
                console.error('Fehler beim automatisierten Scrapen der Website:', typedError);
            }
        });
    });
};

export default scheduleScraping;