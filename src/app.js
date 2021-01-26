const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Prafull Sakpal'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Prafull Sakpal'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is the help page.',
    title: 'Help',
    name: 'Prafull Sakpal'
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'You must provide an address!'
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({error})
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error});
      }

      return res.send({
        address,
        forecast: forecastData,
        location
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errMessage: 'Help article not found!',
    title: '404',
    name: 'Prafull Sakpal'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errMessage: 'Page not found!',
    title: '404',
    name: 'Prafull Sakpal'
  });
});

app.listen(3000, () => {
  console.log('Server is up on Port 3000.');
});