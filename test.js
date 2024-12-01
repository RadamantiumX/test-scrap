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
      
      const text  = await Promise.all(elementHandle.map(el=> el.evaluate(node => ( node.attributes[index].name ) // Pass the input to a function
    )))
     console.log(text)
      console.log((colors.bgGreen('Done! 😊')))
      await browser.close();
}

// test(`https://www.twpornstars.com`, 'img')

export async function loadAttributes (currentPage, element) {
  console.log(colors.bgBlue('Loading...'))
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(currentPage); // Replace with your target URL

  // Function to get all attributes of a specific element
  const getAllAttributes = async (selector) => {
    return await page.evaluate((sel) => {
      const arrayElement = []
      const elements = document.querySelectorAll(sel);
      if (!elements) return null;

      
      for(let i = 0; i < [...elements].length;i++){
       
       let nodeMap = [...elements][i].attributes
       const attributes = {};
        for(let y = 0; y < nodeMap.length; y++){
             // Extract all attributes into an object
            
             attributes[nodeMap[y].name] = nodeMap[y].value
            
        }
        arrayElement.push(attributes) 
      }
      return arrayElement
    }, selector);
  };

  // Example usage
  const attributes = await getAllAttributes(element); // Replace 'h1' with the desired selector
  const results_length = attributes.length
  console.log({attributes,results_length});
  console.log((colors.bgGreen('Done! 😊')))
  await browser.close();
}

// loadAttributes()