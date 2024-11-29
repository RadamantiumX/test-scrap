import readline from 'readline'
import colors from 'ansi-colors'
import { test } from './test.js';

///////////////////////////////////////////////////////////////////////////////////
  
  async function userValue() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
 console.log('🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐 Scrap To JSON 🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐')
    // Ask the user for input
  rl.question(colors.cyan('Please insert the url: '), (answer) => {
    test(answer); // Pass the input to a function
    rl.close(); // Close the interface
  });
  }
  
// userValue()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  let values = []; // Array to store the values
  
  function askForValue(param = 'url') {

   // console.log('🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐', colors.red('Scrap To JSON') ,'🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐')

    rl.question(colors.cyan(`Enter a ${param}: `), (input) => {
     
      if (values.length >= 1) {
        values.push(input);
        test(values[0], values[1])
        rl.close();
      } else {
        values.push(input); // Add input to the array
        
            askForValue('DOM Element tag (without "<>") or selector'); // Ask again
        
        
      }
    });
  }
  
  
  
  askForValue();