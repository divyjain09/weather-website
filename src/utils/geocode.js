const request = require('request')

const geocode = (address, callback) => {
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGl2eWphaW4iLCJhIjoiY2sxdWdwOHlpMDk1MzNibjBqNTY3NXZ4MCJ9.Hwl3u_sd7aSwLnvAAnp91g&limit=1'
    request({ url, json: true }, (error, {body}) => { 
        if(error) {
            callback('Unable to connect to location service.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
        //console.log( lat+ ' is Latitude ' + long + ' is Longitude')
    })
}
module.exports = geocode