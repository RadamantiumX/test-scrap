import fs from 'fs'

async function flatArray(){
    const read = fs.readFileSync('./links-1.json')
    const parseData = await JSON.parse(read)
    const newFlatJson = await parseData.flat()
    
    fs.writeFile('./flat-links-1.json', JSON.stringify(newFlatJson), err =>{
        if(err) throw new err

        console.log(`Data flated!`)
    })
}

flatArray()