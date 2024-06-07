import { startScraping } from '../../controller/scraper/scraperCtrl';
import express from 'express';
import { Router } from 'express';

const ScrapeRouter = express
.Router()
.post('/scrape/indigo', startScraping)




export default ScrapeRouter;