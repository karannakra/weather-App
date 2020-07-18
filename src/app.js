const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const foreCast = require('./utils/forecast')

const app = express()
//define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and view engine
app.set('view engine', 'hbs')
app.set('views', viewPath)

//setup static directory to serve
app.use(express.static(publicPath))

//register the path for the partials
hbs.registerPartials(partialPath)


app.get('', (req, res) => {
    res.render('index', {
        home: 'active'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        about: 'active'
    })
})

app.get('/about/*', (req, res) => {
    res.render('404')
})

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'active'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404')
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        res.send({
            error: 'please enter a location'
        })

    }

    else {
        geocode(address, (err, {latitude, longitude} = {}) => {
                if (err) {
                    res.send({
                        error: err
                    })
                } else {
                    foreCast(latitude, longitude, (err, forecaseData) => {
                        if (err) {
                            console.log(err)
                        } else {
                            res.send({
                                city: forecaseData.city,
                                country: forecaseData.country,
                                temperature: forecaseData.temperature,
                                windspeed: forecaseData.windspeed
                            })
                        }
                    })
                }
            }
        )
    }
})
app.get('/weather2',(req,res)=>{
    res.render('weather2')
})
    app.get('*', (req, res) => {
        res.render('404')
    })

    app.listen(3000, () => {
        console.log('listening on port 3000')
    })