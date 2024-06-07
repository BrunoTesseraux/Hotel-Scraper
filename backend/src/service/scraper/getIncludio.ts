import puppeteer from 'puppeteer';
import HotelModel from '../../models/Hotel';

interface ScrapedPrice {
    typ: string;
    size: string;
    price: string;
    date: Date;
}

interface HotelDetails {
    name: string;
    stars: string;
    roomTypes: string[];
    breakfastIncluded: boolean;
}

export const getIncludio = {
    scrapeAndSave: async (hotelDetails: HotelDetails) => {
        const url = 'https://onepagebooking.com/includio?arrival=07.06.2024&departure=08.06.2024&lang=de&adults=1&rooms=1&children=0';

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        const result = await page.evaluate(() => {
            const priceElements = document.querySelectorAll('.grid-item');
            return Array.from(priceElements).map(priceElement => {
                const element = priceElement as HTMLElement;
                let inseratText = element ? element.innerText : 'Preis nicht gefunden';
                return {
                    inserat: inseratText
                };
            });
        });
        console.log(result);

        await browser.close();

        // Verarbeite die gescrapten Daten
        const processedPrices = result.map(item => processScrapedData(item.inserat));

        // Erstelle ein Hotel-Dokument mit den übergebenen Hotel-Details und den gescrapten Preisen
        const hotelData = {
            ...hotelDetails,
            pricePerNight: processedPrices,
            pricePerNightFuture: []
        };

        const hotel = new HotelModel(hotelData);
        await hotel.save();
        return hotel;
    }
};

// Hilfsfunktion zur Verarbeitung der gescrapten Daten
const processScrapedData = (inseratText: string): ScrapedPrice => {
    const parts = inseratText.split('\n\n');
    const typ = parts[0] || 'Typ nicht gefunden';
    const size = parts[1] || 'Größe nicht gefunden';
    const priceMatch = parts[2]?.match(/ab (\d+,\d+ €)/);
    const price = priceMatch ? priceMatch[1] : 'Preis nicht gefunden';
    const date = new Date(); // Setze das Datum entsprechend deiner Anforderungen

    return {
        typ,
        size,
        price,
        date
    };
};