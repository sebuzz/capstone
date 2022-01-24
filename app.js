// import { promises as fs } from "fs";

import { writeFile } from 'fs/promises';


console.log("Hello World");

writeFile("foo", "Axel der Kater");

writeFile("hello.json", JSON.stringify({"x": 5, "y": 6}, null, 4));