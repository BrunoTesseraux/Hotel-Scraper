import puppeteer from 'puppeteer';
import HotelModel from '../../models/Hotel';

interface ScrapedPrice {
    typ: string;
    size: string;
    price: string;
    date: Date;
}

interface HotelDetails {
    name?: string;
    stars?: string;
    roomTypes?: string[];
    breakfastIncluded?: boolean;
    pricePerNight: ScrapedPrice[];
    pricePerNightFuture: ScrapedPrice[];
}

export const getIncludio = {
    scrapeAndReturn: async (): Promise<HotelDetails> => {
        const url = 'https://onepagebooking.com/includio?arrival=07.06.2024&departure=08.06.2024&lang=de&adults=1&rooms=1&children=0';

        try {
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle2' });

            const result = await page.evaluate(() => {
                const priceElements = document.querySelectorAll('.grid-item');
                return Array.from(priceElements).map(priceElement => {
                    const element = priceElement as HTMLElement;
                    let inseratText = element ? element.innerText : 'Preis nicht gefunden';
                    return {
                        inseratText
                    };
                });
            });

            await browser.close();

            const processedPrices = result.map(item => processScrapedData(item.inseratText));

            const hotelData: HotelDetails = {
                pricePerNight: processedPrices,
                pricePerNightFuture: []
            };
            console.log('hotelData:', hotelData);

            return hotelData;
        } catch (error) {
            const typedError = error as Error;
            console.error('Error during scraping data:', typedError);
            throw new Error('Scraping data failed: ' + typedError.message);
        }
    }
};

const processScrapedData = (inseratText: string): ScrapedPrice => {
    const regex = /(DOPPELZIMMER\s+[A-Z\s+\-]+|FAMILIENZIMMER)\s*\n*\s*(\d+\s*m²)\s*\n*\s*ab\s*(\d+,\d{2})\s*€/;

    const parts = regex.exec(inseratText);

    const typ = parts ? parts[1].trim() : 'Typ nicht gefunden';
    const size = parts ? parts[2].trim() : 'Größe nicht gefunden';
    const price = parts ? parts[3].trim() : 'Preis nicht gefunden';
    const date = new Date();

    return {
        typ,
        size,
        price,
        date
    };
};