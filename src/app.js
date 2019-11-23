const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

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
        helpText: 'This is some helpful text'
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

app.listen(3000, () => {
    console.log('Server is Up on port 3000')
})
