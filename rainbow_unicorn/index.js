var http = require('http');
var parseString = require('xml2js').parseString;


module.exports = function (context) {
    
    var data = {};
    
    var weatherOptions = {
        host: 'wxdata.weather.com',
        path: '/wxdata/weather/local/FIXX0025?cc&dayf=1&unit=m&locale=fi_FI'
    };
    var foodOptions = {
        host: 'www.semma.fi',
        path: '/modules/json/json/Index?costNumber=1408&language=fi'
    };
    
    var weatherReq = http.request(weatherOptions, (res) => {
        var body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            parseString(body, function (err, result) {
                data['weather'] = JSON.stringify(result);
            });
         });
    }).on("error", (error) => {
        context.log('error');
        context.res = {
            status: 500,
            body: error
        };
        context.done();
    });

    weatherReq.end();

    var foodReq = http.request(foodOptions, (res) => {
        var body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            data['food'] = body;
            context.res = {
            status: 200,    
            body: data
        }; 
    context.done();
         });
    }).on("error", (error) => {
        context.log('error');
        context.res = {
            status: 500,
            body: error
        };
        context.done();
    });

    foodReq.end();
}
    