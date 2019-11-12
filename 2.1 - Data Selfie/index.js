const express = require('express');
const app = express();
app.listen(3000, () => {
   console.log('Listening....'); 
});

app.use(express.static('public'));
app.use(express.json());

app.post('/api', (req, res) => {
    console.log(req.body);
    res.json({
        status: "Success"
    });
});