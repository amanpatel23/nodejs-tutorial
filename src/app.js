const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express configs
const publicDirectoryPath = path.join(__dirname, '../public/');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlerbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Aman Patel',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Aman Patel',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Aman Patel',
    help_text: 'This is some helpful text.',
  });
});

// weather page
app.get('/weather', (req, res) => {
  
  if(!req.query.address){
    return res.send({
      error_msg: 'You must provide a serach term.'
    })
  }
  geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error){
      return res.send({
        error_msg: 'Something went really very wrong!'
      })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if(error){
        return res.send({
          error_msg: 'Something went really very wrong!'
        })
      }

      res.send({
        location,
        temperature: forecastData.temperature,
        wind_speed: forecastData.windSpeed,
        humidity: forecastData.humidity
      })
    })
  })
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error_msg: 'You must provide a search term.',
    });
  }
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404',
    name: 'Aman Patel',
    error_msg: 'Help page not found.',
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: '404',
    name: 'Aman Patel',
    error_msg: 'Page not found.',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
