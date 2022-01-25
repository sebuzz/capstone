
// expected
// node args.js foo bar baz


import { argv } from 'process';

const myArgs = function() {
    argv.splice(0,2);
    return argv;
}
console.log(myArgs().join(" "));