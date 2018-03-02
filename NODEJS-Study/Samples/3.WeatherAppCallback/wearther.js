const request = require('request');

var getWeather = (lat, Lng, callback) =>{
  request({
    url: `https://api.darksky.net/forecast/d1fb365e3405215ff598af9438f431d0/${lat},${Lng}`,
    json: true
  }, (error, response, body) => {
    if(error){
      callback("Unable to connect to api.darksky.net servers.");
    }else if(response.statusCode === 400){
      callback("Uable to fetch weather.");
    }else if(response.statusCode === 200){
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
        summary: body.currently.summary
      })
    }
  });
};

module.exports.getWeather = getWeather;

//me(10 Chichester Place): https://api.darksky.net/forecast/d1fb365e3405215ff598af9438f431d0/43.7763381,-79.3214259