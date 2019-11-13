const express = require('express');
const favicon = require('serve-favicon');
const Datastore = require('nedb');
const fetch = require('node-fetch');

const app = express();
const database = new Datastore('database.db');

const DARK_SKY_API_KEY = '94bd194d928a838a83da6b2fa9da6940';

app.use(favicon('./favicon.ico'));
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('WeatherHere listening on port 3000');
});

app.get('/weather/:latlon', async (req, res) => {    
    const latlon = req.params.latlon.split(',');
    const lat = latlon[0];
    const lon = latlon[1];

    var outputData = {};

    // DARK SKY
    const DARK_SKY_URL = `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${lat},${lon}`;
    console.log('Sending: ' + DARK_SKY_URL);
    var response = await fetch(DARK_SKY_URL);
    var data = await response.json();
    // console.log(data);
    outputData['weather'] = data;

    const AIR_QUALITY_URL = `https://api.openaq.org/v1/latest?coordinates=40.73,-73.99`;
    response = await fetch(AIR_QUALITY_URL);
    data = await response.json();
    outputData['air_quality'] = data;

    res.json(outputData);
});

