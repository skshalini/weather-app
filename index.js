const express = require('express');
const bodyparse = require('body-parser');
const path = require('path');
const ejs = require('ejs');

// const public = path.join(__dirname, './public');

const app = express();

const weatherdata = require('./utils/weatherdata');

const port = process.env.PORT || 3000;

// app.use(express.static(public));
app.set('view engine', 'ejs');



app.get('', (req, res) => {
    // res.send("hi weather");
    res.render('index', {
        title: "Weather app"
    })
})
app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: "You must enter the address to get the details"
        })
    }
    else {
        weatherdata(address, (error, { temperature, description, cityname }) => {
            // console.log(result);
            if (error) {
                return res.send({ error })
            }
            console.log(temperature);
            res.send({
                temperature,
                description,
                cityname
            })

        })
        // res.send("weather");
    }

})
app.get('*', (req, res) => {
    res.render('error', {
        title: "Page not found"
    })
})

app.listen(port, () => {
    console.log('Listening at 3000');
})