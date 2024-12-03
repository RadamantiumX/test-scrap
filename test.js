import puppeteer from "puppeteer";
import colors from 'ansi-colors'
import fs from 'fs'

export async function test(reqPage, tag, usage) {
     
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

export async function loadAttributes (currentWebPage, element, usage,jsonName) {
  console.log(colors.bgBlue('Loading...'))
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(currentWebPage); // Replace with your target URL

  // Function to get all attributes of a specific element
  const getAllElementsAttributes = async (selector) => {
    return await page.evaluate((sel) => {
      try{
        const arrayElement = [] 
      const elements = document.querySelectorAll(sel); // Select all elements
      if (!elements) return null;

      
      for(let i = 0; i < [...elements].length;i++){
       let innerText = [...elements][i]
       let nodeMap = [...elements][i].attributes
       const attributes = {};
        for(let y = 0; y < nodeMap.length; y++){
             // Extract all attributes into an object
            
             attributes[nodeMap[y].name] = nodeMap[y].value
             attributes['inner_html'] = innerText.innerHTML
        }
        arrayElement.push(attributes) 
      }
      return arrayElement
      }catch(error){
        console.error('message',error)
      }
      
    }, selector);
  };

  const getSingleElementAttributes = async (selector) => {
    return await page.evaluate((sel) => {
      try{
         const arrayElement = []
      const element = document.querySelector(sel);
      if (!element) return null;

       let nodeMap = element.attributes
       const attributes = {};
        for(let y = 0; y < nodeMap.length; y++){
             // Extract all attributes into an object
            
             attributes[nodeMap[y].name] = nodeMap[y].value
             attributes['inner_html'] = element.innerHTML
            
        }
        arrayElement.push(attributes) 
      
      return arrayElement
      }catch(error){
         console.error(error)
      }
      
    }, selector);
  }

  // Example usage

  if(usage.includes('all')){
      // All data element //
     const all_data_element = await getAllElementsAttributes(element); // Replace 'h1' with the desired selector
     const results_length = all_data_element.length
   //  console.log({all_data_element,results_length});
  // All data element //
  fs.writeFile(`${jsonName}.json`, JSON.stringify({all_data_element,results_length}), err =>{
    if(err) throw new err

    console.log(colors.bgBlueBright(`${jsonName}.json has been created!`))
   })
     console.log((colors.bgGreen('Done! 😊')))
    await browser.close();
  }else{
    // Single Element //
    const single_data_element = await getSingleElementAttributes(element);
    // console.log({single_data_element})
    fs.writeFile(`${jsonName}.json`, JSON.stringify(single_data_element), err =>{
      if(err) throw new err
  
      console.log(colors.bgBlueBright(`${jsonName}.json has been created!`))
     })
    console.log((colors.bgGreen('Done! 😊')))
    await browser.close();
    // Single Element //
  }
  

  
}

