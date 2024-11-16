import fs from "fs";
import puppeteer from "puppeteer";

async function getMedia() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  const read = fs.readFileSync("./scrap-data/mock-data.json");
  const parseData = await JSON.parse(read);
  for (let i = 0; i < parseData.length; i++) {
    for (let y = 0; y < parseData[i].source.length; y++) {
      await page.goto(parseData[i].source[y].links);
      const results = await page.evaluate(() => {
        try {
          const videoSource = document.querySelector("source");
          if (videoSource !== null) {
            return videoSource.getAttribute("src");
          }

          const imageSource = document.querySelector(".thumb__img");
          return imageSource.getAttribute("src");
        } catch (error) {
            return null
        }
      });

      parseData[i].source[y].embed = results;
    }
    parseData[i].id = i
  }

  fs.writeFile(
    "./scrap-data/final-data.json",
    JSON.stringify(parseData),
    (err) => {
      if (err) throw new err();

      console.log(`Data page added`);
    }
  );

  await browser.close();
}

getMedia();
