require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3050;
const API_KEY = process.env.REACT_APP_API_KEY

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/weather-data', (req, res) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${req.body.city},${req.body.country}&appid=${API_KEY}&units=metric`
    console.log(`body data received is ${JSON.stringify(req.body)} and making request to ${url}`);
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(`weather data is ${JSON.stringify(data)}`)
        res.status(200).json(data);    
    })
});

app.listen(PORT, () => {
    console.log("App started on port " + PORT);
});

// Universal Resource Locator
// URL parts
// https://www.google.com/search?client=firefox-b-d&q=create+simple+express+api
// protocol - https (http)
// host - www.google.com (domain, subdomain)
// port - (http - 80, https - 443, 3050)
// path - search
// query - client=firefox-b-d&q=create+simple+express+api ({"client": "firefix-b-d", "q": "create+simple+express+api"})
// body - (POST, PUT, PATCH)
// non-idempotent 