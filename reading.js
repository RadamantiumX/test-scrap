import fs from 'fs'
import puppeteer from 'puppeteer'

async function readingFileAndSaving(){
    const arrayPage = []
    const browser =  await puppeteer.launch({
        headless:false,
      })
      // New instance of BROWSER (not the current in use)
      const page = await browser.newPage()
    const read = fs.readFileSync('./links-to-album-1.json')
    const parseData = await JSON.parse(read)
   
    for (let i = 1; i < 2;i++){
     for(let y = 0; y < parseData[i].length; y++){
        await page.goto(parseData[i][y])  

        const results = await page.evaluate(()=>{
            const content = document.querySelectorAll('.thumb__img')
            const data = [...content].map(con=>{
            const source = con.getAttribute('src')
            return source
        })
        return data
        })

       /* const writeData = fs.writeFileSync(`./scrap-data/page-${i}-model-${y}.json`, JSON.stringify(results), (err)=>{
        if(err){
            console.log(err)
        }else{
            console.log('Data is saved!')
        }
    })*/

        arrayPage.push(results)
     }   
      
    
}
const writeData = fs.writeFileSync(`./scrap-data/only_thumbs.json`, JSON.stringify(arrayPage), (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('Data is saved!')
    }
})
console.log(arrayPage)
await browser.close()
}

readingFileAndSaving()


// Obtenemos el numero total de paginas de cada modelo
async function getAllList(){
    const browser =  await puppeteer.launch({
        headless:false,
      })


    // New instance of BROWSER (not the current in use)
    const page = await browser.newPage()
    const read = fs.readFileSync('./links-to-album-1.json')
    const parseData = await JSON.parse(read)  
    await page.goto('https://www.twpornstars.com/hime_tsu')  
    const results = await page.evaluate(()=>{
        const list = document.querySelectorAll('.pagination li')
        const data = [...list].map((li,index, arr)=>{

            if (index === arr.length - 2){
               return `the last page is: ${li.innerText}`
            }

            
          return 
        })
       return data
    })
   console.log(results)
    await browser.close()
}

// getAllList()