import puppeteer from 'puppeteer';

interface Selectors {
    price: string;
    steps?: string[];
}

interface ScrapeOptions {
    url: string;
    selectors: Selectors;
}

export async function scrapeElement(options: ScrapeOptions): Promise<any> {
    const { url, selectors } = options;

    // Launch the browser
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    console.log(`Navigating to ${url}`);
    // Go to the specified URL
    await page.goto(url);

    await page.setViewport({ width: 1080, height: 1024 });

    console.log('Page loaded');

    // Handle optional steps if selectors are provided
    if (selectors.steps) {
        for (const step of selectors.steps) {
            if (step) {
                await page.waitForSelector(step, { visible: true });
                await page.click(step);
                console.log(`Handled step: ${step}`);
                // Wait for the step element to disappear
                await page.waitForFunction(
                    (selector) => !document.querySelector(selector),
                    {},
                    step
                );
            }
        }
    }

    // Extract the data from the page
    const prices = await page.$$eval(selectors.price, elements => {
        return elements.map(element => element.textContent?.trim() || '');
    });


    // Close the browser
    await browser.close();
    console.log('Browser closed');

    return prices;
}

// Example usage:
export const scrapeOptionsElement: ScrapeOptions = {
    url: 'https://onepagebooking.com/includio?arrival=07.06.2024&departure=08.06.2024&lang=de&adults=2&rooms=1&children=0',
    selectors: {
        price: '.price ng-tns-c118-9 ng-star-inserted', // Selector for the price
        steps: ['.icon-close-large'] // Selectors for steps to handle
    }
};
