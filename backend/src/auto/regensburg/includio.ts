// src/scheduler.ts
import cron from 'node-cron';
import { ScraperService } from '../../service';


/**
 * Scrapes hotel data from the Includio service at specified times and saves it to the database.
 */
const includio = () => {

    const times = ['0 5 * * *', '0 18 * * *'];

    times.forEach(time => {
        cron.schedule(time, async () => {
            try {
                console.log(`Running scraping job at ${new Date()}`);

                // Scrape data from the service
                const scrapedHotelData = await ScraperService.getIncludio.scrapeAndReturn();

                // Fill additional details as needed
                const hotelData = {
                ...scrapedHotelData,
                name:"Includio",
                stars: "4",
                roomTypes: ["DOPPELZIMMER COMFORT PLUS", "DOPPELZIMMER COMFORT TYP A", "DOPPELZIMMER COMFORT TYP B","FAMILIENZIMMER",],
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

export default includio;