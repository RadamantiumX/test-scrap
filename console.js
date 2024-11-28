import readline from 'readline'
import colors from 'ansi-colors'

function prompeteer() {
   
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rl.question('Enter something ', (answer)=>{
        console.log( colors.red(`You entered: ${answer}`))
        rl.close()
    })
}

prompeteer()