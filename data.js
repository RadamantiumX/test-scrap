import fs from 'fs'
import puppeteer from 'puppeteer'


// Obtenemos el numero total de paginas de cada modelo
async function getAllData(){
    const browser =  await puppeteer.launch({
        headless:false,
      })


    // New instance of BROWSER (not the current in use)
    const page = await browser.newPage()
    const read = fs.readFileSync('./flat-links-1.json')
    const parseData = await JSON.parse(read)
    for(let i = 0; i < 300; i++){
       
            await page.goto(parseData[i].url) 

            const results = await page.evaluate(()=>{
            const innerArray = []   // Array de paginas 
            const list = document.querySelectorAll('.pagination li')
            const data = [...list].map((li,index, arr)=>{

            if (index === arr.length - 2){
              // Separamos el numero de paginas en el array  
            innerArray.push(li.innerText) 
          
            }

        })
        return innerArray[0]
    })
    // Creamos una nueva "key" en el objeto del JSON
    parseData[i].pages = results
    // Creamos el archivo
    fs.writeFile('./links-1-info.json', JSON.stringify(parseData), err =>{
        if(err) throw new `The ${err} is on the index ${i}`

        console.log(`Data added on main index ${i}`)
    })
        
    }
   
    
    
    await browser.close()
}

getAllData()