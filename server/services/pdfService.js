import puppeteer from 'puppeteer';
import fs from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config.js';
import { generateHtml } from '../templates/pdfTemplate.js';

let browser = null;

async function getBrowser() {
  if (!browser || !browser.connected) {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
  return browser;
}

export async function generatePdf(formData) {
  const html = generateHtml(formData);
  const b = await getBrowser();
  const page = await b.newPage();

  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBytes = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await page.close();

  const filename = `completed_${uuidv4()}.pdf`;
  const outputPath = join(config.outputDir, filename);
  fs.writeFileSync(outputPath, pdfBytes);

  return { filename, outputPath };
}
