import fs from 'fs'

function mergeData() {
    const readLinks = fs.readFileSync('./flat-links-1.json')
    const readNames = fs.readFileSync('./models-name-1.json')
    const readThumb = fs.readFileSync('./models-thumb-1.json')

    const parseDataLinks = JSON.parse(readLinks)
    const parseDataNames = JSON.parse(readNames)
    const parseDataThumbs = JSON.parse(readThumb)

    for(let i = 0; i <= parseDataLinks.length;i++){
        parseDataLinks[i].name = parseDataNames[i]
        parseDataLinks[i].thumb = parseDataThumbs[i]
    }

    fs.writeFile('./merge-data-1.json', JSON.stringify(parseDataMain), err =>{
        if(err) throw new err

        console.log(`Data page added`)
    })
}

mergeData()