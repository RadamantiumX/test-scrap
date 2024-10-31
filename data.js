import fs from "fs";
import puppeteer from "puppeteer";

// Obtenemos el numero total de paginas de cada modelo
async function getAllData() {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const outerArray = [];
  // New instance of BROWSER (not the current in use)
  const page = await browser.newPage();
 
  for (let i = 1; i < 300; i++) {
    await page.goto(`https://www.twpornstars.com/?page=${i}`);


    const results = await page.evaluate(() => {
      const list = document.querySelectorAll(".thumb__img");
      const data = [...list].map(li => {
        // const name = li.innerText; // Model name 
        // return name; 
        const thumb = li.getAttribute('src')
        return thumb
      });
      return data;
    });

    outerArray.push(results)

    // console.log(results);
  }
  const flatArray = outerArray.flat()
  // console.log(outerArray.flat())
  // Creamos el archivo
   fs.writeFile('./models-thumb-1.json', JSON.stringify(flatArray), err =>{
        if(err) throw new err

        console.log(`Data added`)
    })

  await browser.close();
}

getAllData();

// .thumb__model_link a  --> Model name
// .thumb__img --> Model Thumb image