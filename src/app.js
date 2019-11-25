const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//DEFINE paths for express
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

//setup handlebar partials location
hbs.registerPartials(partialsPath)




// app.com
// app.com/help
// app.com/about
// app.com/weather

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Divy Jain'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Divy Jain'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Divy Jain',
        helpText: 'This is a weather application. To use the application you should jump over to the Weather tab. Right over there in the Weather tab you\'ll be able to search for you city in the text field. Once you have entered the search text, hit the Search button and get the city\'s current weather information.'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error : 'You must povide a Address term'
        })
    } else {
        geocode(address, (error, {latitude, longitude, location} = {}) => {
            if(error) {
                return res.send({
                    error
                })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error
                    })
                } 
                res.send({
                    address,
                    location,
                    forecast: forecastData
                })
            })
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Divy Jain',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res)=> {
    res.render('404', {
        title: 'Help',
        name: 'Divy Jain',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is Up on port ' + port)
})
