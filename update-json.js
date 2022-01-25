import { readFile } from 'fs';
import { myArgs } from './args.js';
import { argv } from 'process';
import { writeFile } from 'fs/promises';

readFile(argv[0], 'utf8', (err, data) => {
    if (err) {
        console.error("err:",err);
        return;
    }
    try {
        let parse = JSON.parse(data);
        parse.name = argv[1];
        parse = JSON.stringify(parse);
        console.log("parse: ",parse);
        writeFile(argv[0], parse);

    } catch {
        console.error(err);
    }
})