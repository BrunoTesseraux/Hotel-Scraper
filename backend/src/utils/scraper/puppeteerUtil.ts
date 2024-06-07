import puppeteer from 'puppeteer';

export interface FieldSelector {
  name: string;
  selector: string;
}

export interface ScrapedData {
  [key: string]: string;
}

  const scrapeData = async (url: string, fields: FieldSelector[]): Promise<ScrapedData[]> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  const data = await page.evaluate((fields) => {
    const result: ScrapedData[] = [];
    const elements = document.querySelectorAll('###'); // Passe diesen Selektor an die tatsächliche Struktur der Webseite an

    elements.forEach(element => {
      const item: ScrapedData = {};
      fields.forEach(field => {
        const fieldElement = element.querySelector(field.selector);
        item[field.name] = fieldElement ? fieldElement.textContent || '' : '';
      });
      result.push(item);
    });

    return result;
  }, fields);

  await browser.close();
  return data;
};
export default scrapeData;