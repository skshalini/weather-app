//API call from openweathermap.org
//https://api.openweathermap.org/data/2.5/onecall?lat=45&lon=-90&exclude=hourly,daily&appid=bf34db5b5591fb50fe4ef4c0021020a7
//https://api.openweathermap.org/data/2.5/weather?q=Buxar&appid=bf34db5b5591fb50fe4ef4c0021020a7


const http = require("http");
const fs = require("fs");
const requests = require("requests");


const homefile = fs.readFileSync("home.html", "utf-8");


const replaceval = (tempval, orgval) => {
    let temperature = tempval.replace("{%tempval%}", orgval.main.temp);
    temperature = temperature.replace("{%tempminval%}", orgval.main.temp_min);
    temperature = temperature.replace("{%tempmaxval%}", orgval.main.temp_max);
    temperature = temperature.replace("{%location%}", orgval.name);
    temperature = temperature.replace("{%country%}", orgval.sys.country);
    temperature = temperature.replace("{%status%}", orgval.weather[0].main);
    return temperature;
}

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests('https://api.openweathermap.org/data/2.5/weather?q=Patna&appid=bf34db5b5591fb50fe4ef4c0021020a7')
            .on('data', (chunk) => {
                const objdata = JSON.parse(chunk);
                const arrdata = [objdata];
                // console.log(arrdata);
                const realtimedata = arrdata.map((val) => replaceval(homefile, val)).join("");
                res.write(realtimedata);
                // console.log(realtimedata);
            })
            .on('end', (err) => {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
            });
    }
})

server.listen(8000, "localhost");


