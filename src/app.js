const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//setup handlebars engline and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'vlad'

    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'vlad'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'come gimmie some milk xD',
        title:'help',
        name:'vlad'
    })
})


    


app.get('/weather',(req,res)=>{
        if(!req.query.address){
            return res.send({
                error:'You must provide an address'
            })
        }
        geoCode(req.query.address,(error,{latitude,longitude,location} = {})=>{
            if(error){
            return res.send({ error })
            }

        forecast(latitude, longitude, (forecastError, forecastData) => {
            if(forecastError){
                return res.send({ forecastError })
            }

            res.send({
                location,
                foreCast:forecastData,
                address:req.query.address
                })
            })
        })
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'You must provide a search word'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'help article not found Error 404',
        name:'Vlad'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Page not found',
        name:'Vlad'
    })
})


app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})
