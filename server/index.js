'use strict';
require('dotenv').config();
const serverless = require('serverless-http');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const DEVELOPMENT = "DEVELOPMENT";
const PRODUCTION = "PRODUCTION";

const PORT = process.env.PORT || 3050;
const API_KEY = process.env.REACT_APP_API_KEY
const ENVIRONMENT = process.env.ENVIRONMENT;

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

if (ENVIRONMENT === PRODUCTION) {
    module.exports.handler = serverless(app);
}

if (ENVIRONMENT === DEVELOPMENT) {
    app.listen(PORT, () => {
        console.log("App started on port " + PORT);
    });    
}
