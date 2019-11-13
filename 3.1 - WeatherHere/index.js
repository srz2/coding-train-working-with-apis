const express = require('express');
const favicon = require('serve-favicon');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const config = require('./config');

const app = express();
const database = new Datastore('database.db');
database.loadDatabase();

const DARK_SKY_API_KEY = process.env.DARK_SKY_API_KEY;

app.use(favicon('./favicon.ico'));
app.use(express.static('public'));
app.use(express.json({ limit: "1mb" }));

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

app.get('/api', (req, res) => {
    database.find({}, (err, data) => {
        if (err) {
            res.json({ error: err });
            res.end();
        } else {
            res.json(data);
        }
    });
});

app.post('/api', (req, res) => {
    var data = req.body;
    console.log(data);
    data.timestamp = Date.now();
    database.insert(data);
    res.json({
        status: "Success",
        data: data
    });
});
