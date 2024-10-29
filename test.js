import fs from 'fs'

function addingData() {
    const myJson = fs.readFileSync('./unknow.json')
    const parseData = JSON.parse(myJson)
    parseData[1][1].pages =  "16" 

    
    const newJson = JSON.stringify(parseData)

    fs.writeFile('./unknow.json', newJson, err =>{
        if(err) throw new err

        console.log('Data Added')
    })
}

addingData()