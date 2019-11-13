const express = require('express');
const Datastore = require('nedb');
const favicon = require('serve-favicon');
const app = express();
app.listen(3000, () => {
   console.log('Listening....'); 
});

const database = new Datastore('database.db');
database.loadDatabase();

app.use(favicon('./favicon.ico'));
app.use(express.static('public'));
app.use(express.json({limit: "1mb"}));

app.get('/api', (req, res) => {
    database.find({}, (err, data) => {
        if (err) {
            res.json({error: err});
            res.end();
        } else {
            res.json(data);
        }
    });
});

app.post('/api', (req, res) => {
    const data = req.body;
    data.timestamp = Date.now();
    console.log(data);
    database.insert(data);
    res.json({
        status: "Success",
        data: data
    });
});