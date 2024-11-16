import fs from "fs";
import puppeteer from "puppeteer";

async function complementLinks() {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    const read = fs.readFileSync("./scrap-data/full-data.json")
    const parseData = await JSON.parse(read);
    for (let i = 0; i < parseData.length; i++) {
      await page.goto(parseData[i].url);
      const results = await page.evaluate(() => {
        
        const listThumbs = document.querySelectorAll(".thumb__img") // Imagenes miniatura de galeria
        const listLinks = document.querySelectorAll(".thumb__link") // Links al contenido media
        const listTextContent = document.querySelectorAll(".thumb__info_text") // Texto de la imagen
        const data = [...listThumbs].map((li, index, arr) => {
         
            // Seperamos en un objeto los links y las sources de las imagenes
            return {thumb: li.getAttribute("src"), links: [...listLinks][index].getAttribute("href"), post_text: [...listTextContent][index].innerText}
         
        });
        return data;
      });
      
      parseData[i].source = results;
     
    }
   
    fs.writeFile("./scrap-data/mock-data.json", JSON.stringify(parseData), (err) => {
      if (err) throw new err();
  
      console.log(`Data page added`);
      
    });
  
    await browser.close();
  }

  complementLinks()