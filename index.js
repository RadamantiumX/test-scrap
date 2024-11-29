import puppeteer from "puppeteer";
import fs from "fs";
import { helper } from "./helper.js";

//////////////////////////////////////////////////////////////////////////////////////

// Obtengo solo el attributo que necesito para posteriormente obtener las fotos de cada URL
async function handleDynamicWebPage() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
    });
    // New instance of BROWSER (not the current in use)
    const page = await browser.newPage();

    await page.goto(`https://www.twpornstars.com`);
    // await autoScroll(page)
    const results = await page.evaluate(helper);
    
    fs.writeFile("check.json", JSON.stringify(results), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Data Scrapped");
      }
    });

    await browser.close();
  } catch (error) {
    console.error(`An error was ocurred: ${error}`);
  }
}

handleDynamicWebPage()

// selector images: .thumb__img
// selector anchor: .thumb__link

