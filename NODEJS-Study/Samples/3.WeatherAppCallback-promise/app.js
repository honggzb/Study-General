const yargs = require('yargs');

const geocode = require('geocode.js');
const weather = require('wearther.js');

const argv = yargs
  .option({
    a: { demand: true, alias: 'address', description: 'Address to fetch weather for', string: true }
  })
  .help().alias('help','h').argv;

geocode.geocodeAddress(argv.address, (errorMessage, geoResults)=>{
  if(errorMessage){
    console.log(errorMessage);
  }else{
    //console.log(JSON.stringify(geoResults, undefined, 2));
    console.log(geoResults.address);
    weather.getWeather(geoResults.Latitude, geoResults.Longtitude, (errorMessage, weatherResults)=> {
      if(errorMessage){
        console.log(errorMessage);
      }else{
        console.log(`${weatherResults.summary}.`);
        console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`);
      }
    });
  }
});

//命令行: node app -a "1600 Amphitheatre Parkway"
