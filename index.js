const { parse } = require('csv-parse');
const fs = require('fs');

const results = [];

const isHabitablePlanet = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36
        && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
};

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true // returns data as a KV pair instead of an array of items
    }))
    .on('data', (data) => {
        if(isHabitablePlanet(data)){
            results.push(data);
        }
    })
    .on('error', (err) => {
        console.log('Opps! Something went wrong', err);
    })
    .on('end', () => {
        // print the habitable planet names
        console.log(results.map(planet => {
            return planet['kepler_name'];
        }))
        console.log(`We have ${results.length} habitable planets!!!`);
    });