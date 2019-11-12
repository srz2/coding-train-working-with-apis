const express = require('express');
const Datastore = require('nedb');
const app = express();
app.listen(3000, () => {
   console.log('Listening....'); 
});

const database = new Datastore('database.db');
database.loadDatabase();

app.use(express.static('public'));
app.use(express.json());

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