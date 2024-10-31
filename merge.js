import fs from 'fs'

function mergeData() {
    const mainRead = fs.readFileSync('./flat-links-1.json')
    const innerRead = fs.readFileSync('./links-1-pages.json')

    const parseDataMain = JSON.parse(mainRead)
    const parseDataInner = JSON.parse(innerRead)

    for(let i = 0; i < 600;i++){
        parseDataMain[i].page = parseDataInner[i]
    }

    fs.writeFile('./merge-data-1.json', JSON.stringify(parseDataMain), err =>{
        if(err) throw new err

        console.log(`Data page added`)
    })
}

mergeData()