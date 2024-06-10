// src/scheduler.ts
import cron from 'node-cron';
import { ScraperService } from '../../service';
import { includioConfig } from '../../DAO/additionalDataConfig';


/**
 * Scrapes hotel data from the Includio service at specified times and saves it to the database.
 */
/**
 * Runs a scraping job at specified times using cron scheduling.
 * Scrapes data from the service, fills additional details, and saves the data to the database.
 */

const includio = () => {

    const times = ['39 16 * * *', '0 16 * * *'];

    times.forEach(time => {
        cron.schedule(time, async () => {
            try {
                console.log(`Running scraping job at ${new Date()}`);

                // Scrape data from the service
                const scrapedHotelData = await ScraperService.getIncludio.scrapeAndReturn();
                // Fill additional details as needed
                const hotelData = {
                ...scrapedHotelData,
                ...includioConfig
                };
                
                // Save to database via the service
                const savedHotel = await ScraperService.postIncludio.post(hotelData);
                console.log('Saved hotel data:', savedHotel);
                
            } catch (error) {
                const typedError = error as Error;
                console.error('Fehler beim automatisierten Scrapen der Website:', typedError);
            }
        });
    });
};

export default includio;