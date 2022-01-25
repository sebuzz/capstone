import { readFile } from 'fs';
import { argv } from 'process';


//const myFile =  readFile("package.json", ()=>{console.log("done..")});

readFile('foo', 'utf8' , (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    try {
        let parse = JSON.parse(data);
        console.log(parse)
    } catch {
        console.log(data)
    }

})


