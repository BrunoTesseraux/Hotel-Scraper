import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import ScrapeRouter from './routes/scraper/scraperRoutes';
import scheduleScraping from './scheduler';

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

// Cron-Jobs planen
scheduleScraping();

// Routen definieren

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express and Middleware!');
});

app.use('/api/scrape', ScrapeRouter);


export { app };