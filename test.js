import fs from 'fs'

function addingData() {
    const myJson = fs.readFileSync('./unknow.json')
    const parseData = JSON.parse(myJson)
    const newData = { totalPages: "9" }

    parseData.push(newData)
    const newJson = JSON.stringify(parseData)

    fs.writeFile('./unknow.json', newJson, err =>{
        if(err) throw new err

        console.log('Data Added')
    })
}

addingData()