import mongoose from 'mongoose';
import { app } from './app';
import dotenv from 'dotenv';
import {  scrapeHtml, scrapeOptions } from './puTest';
import { scrapeElement, scrapeOptionsElement } from './service/scraper/baseScraper';

// Laden der Umgebungsvariablen aus der .env-Datei
dotenv.config();

// Funktion zum Starten des Servers
const startServer = async (): Promise<void>=> {
    try {
        // Verbindung zu MongoDB herstellen mit dbName Option
        const dbOptions: mongoose.ConnectOptions = {
            dbName: process.env.DB_NAME as string, // Den Datenbanknamen aus den Umgebungsvariablen laden
        };

        await mongoose.connect(process.env.MONGODB_URL as string, dbOptions);

        console.log('Connected to MongoDB');

        // Server starten
        const PORT: number = parseInt(process.env.PORT as string, 10) || 8080;
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
};

// scrapeHtml(scrapeOptions).then(() => console.log('Scraping completed.'));

// scrapeElement(scrapeOptionsElement).then(data => console.log(data));





    startServer();


