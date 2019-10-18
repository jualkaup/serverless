const parseString = require('xml2js').parseString;
const fetch = require("node-fetch");

module.exports = async function (context) {
    var response = {};
    var option = context.bindingData.option;

    if (option === "food" || option === undefined) {
        await fetchFood().then(data => {
            response['food'] = data;
        });
    }

    if (option === "weather" || option === undefined) {
        await fetchWeather(context).then(data => {
            response['weather'] = data;
        });
    }

    return response;
}

async function fetchWeather() {
    var response = await fetch('https://wxdata.weather.com/wxdata/weather/local/FIXX0025?cc&dayf=7&unit=m&locale=en_GB');
    var data = await response.text();
    parseString(data, function (err, result) {
        data = result;
    });
    return data;
}

async function fetchFood() {
    var response = await fetch('https://www.semma.fi/modules/json/json/Index?costNumber=1408&language=en');
    var data = await response.json();
    return data;
}