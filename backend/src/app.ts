import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import dotenv from 'dotenv';
import ScrapeRouter from './routes/scraper/scraperRoutes';
import puppeteer from 'puppeteer';

dotenv.config();

const app = express();

// Middleware konfigurieren
app.use(cors());
app.use(cookieSession({
    name: 'session',
    keys: [process.env.SESSION_KEY || 'default_key'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(morgan('dev'));
app.use(express.json());

// Routen definieren

//Scraping
// app.use('/api', ScrapeRouter); // /api/scrape/ @NikolaSretko testing!


app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express and Middleware!');
});

app.get('/scrape', async (req:Request, res:Response) => {
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

            // inseratText = inseratText.replace(/\s\s+|\n/g, ' ').trim();

            return {
                inserat: inseratText
            };
        });
    });


        await browser.close();

        res.json({ data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Fehler beim Scrapen der Website' });
    }
});

export { app };