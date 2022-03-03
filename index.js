const Parse =  require('csv-parse').parse;
const fs = require('fs');

const habitablePlanets = [];

function isHabitableplanet(planet){
       return planet['koi_disposition']==='CONFIRMED' 
       && planet['koi_insol'] > 0.36 && planet['koi_insol']<1.11
       && planet['koi_prad']< 1.6;
};


fs.createReadStream('kepler_data.csv')
    .pipe(Parse({
        comment: '#',
        columns: true,
    }))
    .on('data', function(data){
        if (isHabitableplanet(data)){
            habitablePlanets.push(data);
        }
    })
    .on('error', function(err){
        console.log(err);
    })
    .on('end', function(){

        console.log(habitablePlanets.map((planets)=>{
            return planets['kepler_name'];
        }));
        console.log(` ${habitablePlanets.length} is the amount of habitable planets found`);
        console.log('done');
    });
