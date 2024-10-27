import puppeteer from 'puppeteer'
import fs from 'fs'


  async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100; // scroll step in pixels
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
  
          // Stop scrolling if we've reached the bottom
          if (totalHeight >= document.body.scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100); // delay in ms
      });
    });
  }



//////////////////////////////////////////////////////////////////////////////////////



  // Obtengo solo el attributo que necesito para posteriormente obtener las fotos de cada URL
  async function handleDynamicWebPage() {
    const browser =  await puppeteer.launch({
      headless:false,
    })
    // New instance of BROWSER (not the current in use)
    const page = await browser.newPage()
    let arrayPage = []
    for(let i = 300; i < 600; i++){
         await page.goto(`https://www.twpornstars.com/?page=${i}`)
    // await autoScroll(page)
    const results = await page.evaluate(()=>{
        
        const content = document.querySelectorAll('.thumb__link')
        const data = [...content].map(con=>{
            const source = con.getAttribute('href')
            return source
            // const children = con.children[0]
            // const attr = children.getAttribute('href') // Get attribute "href"
            // return attr
         
            
            // const innerDiv = con.children[1]
            // const firtsChildren = innerDiv.children[0]
            // const secondChildren = firtsChildren.children[1]
            // const innerTextChildren = secondChildren?.innerText
            //  if (innerTextChildren !== undefined){
            //   return innerTextChildren
            //  }
            //  return null
        })
        return data
    })
    arrayPage.push(results)
    }
    fs.writeFile('links-to-album-2.json',JSON.stringify(arrayPage),(err)=>{
      if(err){
        console.log(err)
      }else{
        console.log('Data Scrapped')
      }
    })
    // console.log(arrayPage)

    await browser.close()
  }
   handleDynamicWebPage()

 