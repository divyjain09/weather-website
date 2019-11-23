const request = require('request')

const forecast = (latitude, longitude, callback) => {
    var url = 'https://api.darksky.net/forecast/801ff64559e73c098e8741655321d117/' + latitude + ',' + longitude +'?units=ca&lang=en'
    request({ url, json: true }, (error, {body}) => { 
        if(error) {
            callback('Unable to connect to weather service !!!', undefined)
        } else if (body.error) {
            callback('Unable to find location !!!', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is ' + body.currently.precipProbability + '% chance of rain.')      
          }
     })  
}

module.exports = forecast