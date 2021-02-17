const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

//Define paths for express config.
const publicDir = path.join(__dirname,'../public');
const viewsDir = path.join(__dirname,'../templates/views');
const partialsDir = path.join(__dirname,'../templates/partials');

//Setup handlebars engine and views location.
app.set('view engine','hbs');
app.set('views',viewsDir);
hbs.registerPartials(partialsDir);

//Setup static directory to serve.
app.use(express.static(publicDir));

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
        name: 'Kaio Fontes'
    });
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About',
        name: 'Kaio Fontes'
    });
})

app.get('/help', (req,res) => {
    res.render('help',{
        title:'Help',
        name: 'Kaio Fontes',
        msg:'How can i help you ?'
    });
})

app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a address'
        })
    }

    geocode(req.query.address,(error,{longitude,latitude,location}) => {
        if(error){
            return res.send(error);
        }

        forecast(longitude,latitude,(forecastError,{temperature,weather,feelslike}) => {

            if(error){
                return res.send(forecastError);
            }

            res.send({
                forecast:`${weather} the day. Its currently ${temperature} degree out. There is ${feelslike}% chance of rain.` ,
                location: location ,
                address: req.query.address
            })
            
        })
    
    })

    
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query);

    res.send({
        products: []
    })
});

app.get('/help/*', (req,res) => {
    res.render('error',{
        title:'Error',
        name:'kaio',
        msg:'Help article does not exist!!!'
    })
})

app.get('*', (req,res) => {
    res.render('error',{
        title:'error',
        name:'kaio',
        msg:'Page does not exist'
    })
});

app.listen(3000, () => {
    console.log("Server is Running!!!");
});
