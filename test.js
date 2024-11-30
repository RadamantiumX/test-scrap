import puppeteer from "puppeteer";
import colors from 'ansi-colors'
import readline from 'readline'

export async function test(reqPage, tag) {
     
     console.log(colors.bgGreen('Loading...'))
    
    const browser = await puppeteer.launch({
        headless: true,
      });
      // New instance of BROWSER (not the current in use)
      const page = await browser.newPage();
  
      await page.goto(reqPage);
      const elementHandle = await page.$$(tag)
      
      const text  = await Promise.all(elementHandle.map(el=> el.evaluate(node => (node)// Pass the input to a function
    )))
     text.map((item)=>{
       
       for(let i = 0;i < item.attributes.length ;i++){
          console.log(item.attributes[i].value)
       }
     })
      console.log((colors.bgGreen('Done! 😊')))
      await browser.close();
}

// test(`https://www.twpornstars.com`, 'img')

async function loadAttributes () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.twpornstars.com'); // Replace with your target URL

  // Function to get all attributes of a specific element
  const getAllAttributes = async (selector) => {
    return await page.evaluate((sel) => {
      const arrayElement = []
      const elements = document.querySelectorAll(sel);
      if (!elements) return null;

      // Extract all attributes into an object
      const attributes = {};
      for(let i = 0; i < [...elements].length;i++){
        for (const attr of [...elements][i].attributes) {
        attributes[attr.name] = attr.value;
         arrayElement.push(attributes)
      }
     
      }
      return arrayElement
     // return attributes;
    }, selector);
  };

  // Example usage
  const attributes = await getAllAttributes('.thumb__img'); // Replace 'h1' with the desired selector
  console.log(attributes);

  await browser.close();
}

// loadAttributes()