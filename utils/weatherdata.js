const request = require('request');
const constants = require('../config');


const weatherdata = (address, callback) => {
    const url = constants.openweathermap.Base_Url + address + '&appid=' + constants.openweathermap.Secret_key;
    console.log(url);
    request({ url, json: true }, (error, { body }) => {
        // console.log(body);
        if (error) {
            callback("Can't fetch data from open weather app api", undefined);
        }
        else {
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityname: body.name
            });
        }
    });
}

module.exports = weatherdata;