const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));

app.get('/', function (req, res) {
    return res.render('search');
});


app.get('/search', function (req, res) {

    console.log("Request:  ", req.query);


    let name = req.query.movie;
    request(`http://www.omdbapi.com/?s=${name}&apikey=6f54ae08`, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        
        let data=JSON.parse(body);
        return res.render('index', { list: data });
    });


});



app.listen(3000, function (err) {
    console.log('listening');
});
