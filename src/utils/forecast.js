const request=require('request');
const forecast=(latitude, longitude, callback)=>{
    const geocodeURL=`http://api.weatherstack.com/current?access_key=54ac58423ff6027da02499f24236b703&query=${latitude},${longitude}`;
    request({url:geocodeURL,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to the internet',undefined)
        }
        const weather={
                city: response.body.location.name,
                country: response.body.location.country,
                temperature: response.body.current.temperature + '°',
                windspeed: response.body.current.wind_speed + '°'
        }
        callback(undefined,weather)
    })
}
module.exports=forecast;