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
 
  for (let i = 1; i < 10; i++) {
    await page.goto(`https://www.twpornstars.com/?page=${i}`);
    const results = await page.evaluate(() => {
      const listThumb = document.querySelectorAll(".thumb__img");
      const listNameUrl = document.querySelectorAll(".thumb__model_link a");
      
      const data = [...listThumb].map((li,index, arr) => {
        const url = [...listNameUrl][index].getAttribute('href'); // Model URL
        const name = [...listNameUrl][index].innerText; // Model name 
        const thumb = li.getAttribute('src') // Model Thumb image
        return {id:index,url:url,name: name, thumb: thumb}
      });
      return data;
    });

    outerArray.push(results)

    // console.log(results);
  }
  const flatArray = outerArray.flat()
  // console.log(outerArray.flat())
  // Creamos el archivo
   fs.writeFile('./all-data-1.json', JSON.stringify(flatArray), err =>{
        if(err) throw new err

        console.log(`Data added`)
    })

  await browser.close();
}

// getAllData();

// .thumb__model_link a  --> Model name
// .thumb__img --> Model Thumb image

async function getDataInfo() {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const outerArray = []
  // New instance of BROWSER (not the current in use)
  const page = await browser.newPage();

  const readAllData = fs.readFileSync('./short-data.json')
  const parseData = JSON.parse(readAllData)


  for (let y = 0; y < parseData.length; y++){
   const name = parseData[y].name
   const innerArray = []
     for(let i= 1; i < parseInt(parseData[y].pages); i++) {
      await page.goto(`${parseData[y].url}?page=${i}`)
      const results = await page.evaluate(()=>{
         const listThumbs = document.querySelectorAll('.thumb__img')
         const data = [...listThumbs].map((li)=>{
           const thumbs = li.getAttribute('src')
           return thumbs
         })
         return data
      })
      innerArray.push(results)
    }
 outerArray.push(innerArray)
}
 console.log(outerArray) 
 await browser.close();
}

getDataInfo()

// Example Small Thumb: https://pbs.twimg.com/media/FMy80a2WUA4fkYk.jpg:small
// Example Large Thumb: https://pbs.twimg.com/media/FMy80a2WUA4fkYk.jpg:large