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
                    inseratText
                };
            });
        });

        await browser.close();

        // Verarbeite die gescrapten Daten
        const processedPrices = result.map(item => processScrapedData(item.inseratText));
        console.log('processedPrices: ', processedPrices);
        
        // Erstelle ein Hotel-Dokument mit den übergebenen Hotel-Details und den gescrapten Preisen
        const hotelData = {
            ...hotelDetails,
            pricePerNight: processedPrices,
            pricePerNightFuture: []
        };
        console.log('hotelData: ', hotelData);
        
        const hotel = new HotelModel(hotelData);
        await hotel.save();
        return hotel;
    }
};

// Hilfsfunktion zur Verarbeitung der gescrapten Daten
const processScrapedData = (inseratText: string): ScrapedPrice => {
    // Regex Muster zur Extraktion von Typ, Größe und Preis
    const regex = /(DOPPELZIMMER\s+[A-Z\s+\-]+|FAMILIENZIMMER)\s*\n*\s*(\d+\s*m²)\s*\n*\s*ab\s*(\d+,\d{2})\s*€/;

    const parts = regex.exec(inseratText);

    // Wenn die Regex keinen passenden Text findet, werden entsprechende Standardwerte gesetzt
    const typ = parts ? parts[1].trim() : 'Typ nicht gefunden';
    const size = parts ? parts[2].trim() : 'Größe nicht gefunden';
    const price = parts ? parts[3].trim() : 'Preis nicht gefunden';
    const date = new Date(); // Setze das Datum entsprechend deiner Anforderungen

    // console.log('Typ: ', typ, 'Größe: ', size, 'Preis: ', price);

    return {
    typ,
    size,
    price,
    date
    };
};