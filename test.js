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
      const text  = await Promise.all(elementHandle.map(el=> el.evaluate((node) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
          });
          rl.question(colors.cyan('If you want get an attribute: '), (input) => {
            node.getAttribute(input); // Pass the input to a function
            rl.close(); // Close the interface
          });
        } 
    
    )))
      console.log(text, (colors.bgGreen('Done! 😊')))
      await browser.close();
}

// test(`https://www.twpornstars.com`, 'img')