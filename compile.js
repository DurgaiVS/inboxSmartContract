// compile code will go here
import path from 'path'
import fs from 'fs'
import solc from 'solc'

const inboxPath = path.resolve('C:\\Users\\durga\\VScode\\Blockchain\\inbox\\contracts\\Inbox.sol');
//since __dirname is not defined in ESmodule scope
const source = fs.readFileSync(inboxPath, 'utf-8');
const expFile = solc.compile(source, 1).contracts[':Inbox']; 
//this contracts['"here":Inbox'],"here" is used to speciy filename we compile
//here we only compile one file, so
// console.log(expFile)
export default expFile
