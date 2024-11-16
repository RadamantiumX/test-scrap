import fs from 'fs'
import { tagData } from './const/tags-data.js'

async function addingTags() {
    const read = fs.readFileSync('./scrap-data/final-data.json')
    const parseData = await JSON.parse(read)

    parseData.map((item, index)=>{
      parseData[index].tags = [tagData[Math.floor(Math.random() * tagData.length)], tagData[Math.floor(Math.random() * tagData.length)], tagData[Math.floor(Math.random() * tagData.length)],tagData[Math.floor(Math.random() * tagData.length)]]
    })

    fs.writeFile(
        "./scrap-data/new-full-data.json",
        JSON.stringify(parseData),
        (err)=>{
            if (err) throw new err();
            console.log(`Data page added`);
        }
    )
} 

addingTags()