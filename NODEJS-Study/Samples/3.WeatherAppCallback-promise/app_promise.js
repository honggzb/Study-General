const yargs = require('yargs');
const axios = require('axios');

const geocode = require('./geocode/geocode.js');
const weather = require('./weatherSearch/wearther.js');

const argv = yargs
  .option({
    a: { demand: true, alias: 'address', description: 'Address to fetch weather for', string: true }
  })
  .help().alias('help','h').argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find that address');
  }
  //console.log(JSON.stringify(response.data,undefined, 2));
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  //console.log(lat, lng);
  var weatherUrl = `https://api.darksky.net/forecast/d1fb365e3405215ff598af9438f431d0/${lat},${lng}`;
  return axios.get(weatherUrl);
}).then((response) => {
  //console.log(JSON.stringify(response.data,undefined, 2));
  //console.log(JSON.stringify(response.data.currently,undefined, 2));
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  var summary = response.data.currently.summary;
  console.log(`${summary}.`);
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
}).catch((e) => {
  if(e.code === 'ENOTFOUND'){ 
    console.log('Unable to connect to API servers'); 
  } else {
    console.log(e.message);
  }
});

//命令行: node app -a "1600 Amphitheatre Parkway"