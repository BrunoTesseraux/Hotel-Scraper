import puppeteer from 'puppeteer';
import fs from 'fs';

interface ScrapeOptions {
    url: string;
    closePopupSelector?: string;
    contentLoadSelector?: string; // Selector to ensure content is loaded
    priceSelector: string; // Selector for the price elements
}

export async function scrapeHtml(options: ScrapeOptions): Promise<void> {
    const { url, closePopupSelector, contentLoadSelector, priceSelector } = options;

    // Launch the browser
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    console.log(`Navigating to ${url}`);
    // Go to the specified URL
    await page.goto(url);

    await page.setViewport({ width: 1280, height: 800 });

    console.log('Page loaded');

    // Handle optional popup close if selector is provided
    if (closePopupSelector) {
        await page.waitForSelector(closePopupSelector);
        await page.click(closePopupSelector);
        console.log('Popup closed');
    }

    // Wait for the content to load
    if (contentLoadSelector) {
        await page.waitForSelector(contentLoadSelector);
    }

    // Extract the price data from the page
    const prices = await page.$$eval(priceSelector, elements => {
        return elements.map(element => element.textContent?.trim() || '');
    });

    console.log('Scraped prices:', prices);

    // Extract the full HTML content of the page
    const htmlContent = await page.content();

    // Save the HTML content to a file
    const filePath = './scrapedContent.html';
    fs.writeFileSync(filePath, htmlContent);
    console.log(`HTML content saved to ${filePath}`);

    // Save the prices to a file
    const pricesPath = './prices.txt';
    fs.writeFileSync(pricesPath, prices.join('\n'));
    console.log(`Prices saved to ${pricesPath}`);

    // Close the browser
    await browser.close();
    console.log('Browser closed');
}

// Example usage:
export const scrapeOptions: ScrapeOptions = {
    url: 'https://onepagebooking.com/includio?arrival=07.06.2024&departure=08.06.2024&lang=de&adults=1&rooms=1&children=0',
    closePopupSelector: '.icon-close-large', // Selector for closing the popup, if necessary
    contentLoadSelector: '.room-lowest-price', // Selector to ensure content is loaded
    priceSelector: '.room-lowest-price .price' // Adjust this selector to target the correct price elements
};
