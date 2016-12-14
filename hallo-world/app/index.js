const calc = require('./calc');


const numbersToAdd = [
    3,
    4,
    10,
    2
];

const result = calc.sum(numbersToAdd);
console.log(`The result is : ${result}`);
//console.log(process.cwd());

const fs = require('fs');
console.log('start reading file ...');
fs.readFile('file.md','utf-8', function(err, content){
    if (err) {
         console.log('error happened during reading the  file');
         return console.log(err);
    }

    console.log(conent);
})

console.log('end of the file');