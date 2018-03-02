const request = require('request');

var geocodeAddress = (address, callback) =>{
  var encodedAddress = encodeURIComponent(address);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    //console.log(JSON.stringify(response, undefined, 2));
    //console.log(JSON.stringify(body, undefined, 2));
    //console.log(JSON.stringify(error, undefined, 2));
    if(error){
      //console.log("Unable to connect to Google servers.");
      callback("Unable to connect to Google servers.");
    }else if(body.status === 'ZERO_RESULTS'){
      //console.log("Uable to find that address.");
      callback("Uable to find that address.");
    }else if(body.status === 'OK'){
      // console.log(`Address: ${body.results[0].formatted_address}`);
      // console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
      // console.log(`Longtitude: ${body.results[0].geometry.location.lng}`);
      callback(undefined, {
        address: body.results[0].formatted_address,
        Latitude: body.results[0].geometry.location.lat,
        Longtitude: body.results[0].geometry.location.lng
      });
      
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;