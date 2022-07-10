const { parse } = require('csv-parse');
const fs = require('fs');

const results = [];

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true // returns data as a KV pair instead of an array of items
    }))
    .on('data', (data) => {
        results.push(data);
    })
    .on('error', (err) => {
        console.log('Err', err);
    })
    .on('end', () => {
        console.log(results);
        console.log('Done!!');
    })