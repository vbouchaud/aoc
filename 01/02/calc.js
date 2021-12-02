#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt'),
});

array = [];
readInterface.on('line', line => {
    array.push(Number(line));
});

readInterface.on('close', () => {
    const grouped = [];
    for (i = 0; i < array.length - 2; i++) {
        grouped.push(array[i] + array[i+1] + array[i+2]);
    }

    let previous = -1;
    let res = 0;
    for (i = 0; i < grouped.length; i++) {
        if (previous !== -1 && grouped[i] > previous) {
            res++;
        }
        previous = grouped[i];
    }

    console.log(res);
});

