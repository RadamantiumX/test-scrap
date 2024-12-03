import { readlineConsole } from './helper.js';
import colors from 'ansi-colors'
import { test, loadAttributes } from './test.js';
import { validateAttribute } from './validations.js';
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


////////////////////////// Current function to production ///////////////////////////////////
 const {rl, values} = readlineConsole()
  
  async function askForValue(param = 'url') { // Pre-initialized "param" ---> next change
   
   // console.log('🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐', colors.red('Scrap To JSON') ,'🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐')
   try{
    rl.question(colors.cyan(`Enter a ${param}: `), (input) => {
     
      if (values.length >= 2) {
        values.push(input);
        const validation = validateAttribute({ attr: values[2] })
        if(!validation.success){
            console.log(colors.bgRed(validation.error.message))
            rl.close();
            return
          }
        loadAttributes(values[0], values[1],'all', values[2])
        rl.close();
      } else {
        values.push(input); // Add input to the array
          if(values.length <= 1){
            askForValue('DOM Element tag (without "<>") or selector'); // Ask again
          }
          askForValue('file name'); // Ask again
          
        
      }
    });
   }catch(error){
     console.error(error)
   }
      
     
    
    
  }
  
  
  
  askForValue();

  ////////////////////////// Current function to production ///////////////////////////////////