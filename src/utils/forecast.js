const request = require('request')

// desctructuring only on response
//shorthand on request

const forecast = (latitude,longitude,unit='m',callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=79d1e42b1ba5453a81e7508c3121c7b1&query='+ latitude +','+ longitude +'&units='+unit
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location service, Please check your network connection',undefined)
        }else if(body.error){
            callback('Wrong coordinates please try different coordinates.',undefined)
        }else{
            callback(undefined,
            'It is currently '+ body.current.weather_descriptions[0] +
            ', Current weather temperature is: '+ body.current.temperature +' degrees'+
            ', Feels like '+ body.current.feelslike+' degrees,'+
            ' Current humidity levels are at: '+body.current.humidity+'%'
            )
        }
    })
}
module.exports = forecast

