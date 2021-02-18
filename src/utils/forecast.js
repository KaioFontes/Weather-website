const request = require('postman-request');

const forecast = (longitude,latitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=5acfc476bc0eca28d7aa8f5abf050f22&query=' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude);

    request({url,json:true},(error,{body}) => {

        if(error){
            callback('Unable to connect to thw weather server!!',undefined);
        }else if(body.error){
            callback('Unable to find the location!!',undefined);
        }else{
            callback(undefined,{
                temperature:body.current.temperature ,
                feelslike:body.current.feelslike,
                humidity:body.current.humidity,
                weather:body.current.weather_descriptions[0]
            })
        }
        
    })
}

module.exports = forecast;