import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import Buttons from './Buttons'
import { useSelector } from 'react-redux'


const Forecast = () => {

  const [lat, setLat] = useState(useSelector(state => state.address.lat))
  const [lon, setLon] = useState(useSelector(state => state.address.lon))
  const [forecast, setForecast] = useState([])
  const [res, setRes] = useState([])


  let apiKey = "c6547fc921c44089b5732327240803"
  let url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=5&aqi=no&alerts=no`

  const daysofweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const getForecast = useCallback(async () => {
    let data = await fetch(url)
    let response = await data.json()
    setForecast(response.forecast.forecastday)
    setRes([...res, response.location])

  }, [url, lat, lon, apiKey])

  useEffect(() => {
    getForecast()
  }, [])


  return (
    <>
      <div className="main flex flex-col gap-5">
        {forecast.map(item => {
          return (
            <div key={item.date_epoch} className="results">
              <div className="upper rounded-t-md md:w-[50%] w-[80%] mx-auto my-5 flex flex-col gap-16 p-5 bg-[url('/bgdetail.jpg')] bg-center">
                <div className="date-location flex flex-col">
                  <div className='day md:text-lg font-bold'>{daysofweek[new Date(item.date).getDay()]}</div>
                  <div className='date'>{item.date}</div>

                  <div className='loction flex gap-1'>
                    <span>{res[0].name},</span>
                    <span>{res[0].country}</span>
                  </div>
                </div>
                <div className='temprature flex flex-col'>
                  <span className='font-semibold md:text-lg'>Max Temprature : {Math.floor(item.day.maxtemp_c)}℃</span>
                  <span className='font-bold md:text-lg'>Average Temprature : {Math.floor(item.day.avgtemp_c)}℃</span>
                  <span className='font-semibold md:text-lg'>Min Temprature : {Math.floor(item.day.mintemp_c)}℃</span>
                  <span>{item.day.condition.text}</span>
                  
                </div>
              </div>

              <div className='down'>
                <div className='other bg-black p-3 w-[81%] md:w-[50%] mx-auto my-[-20px] rounded-b-md'>
                  <div className='humidity flex justify-between font-bold md:text-lg'>
                    <span>Humidity</span>
                    <span>{item.day.avghumidity}%</span>
                  </div>

                  <div className='wind flex justify-between font-bold md:text-lg'>
                    <span>Wind</span>
                    <span>{item.day.maxwind_kph} km/h</span>
                  </div>

                  <div className='wind flex justify-between font-bold md:text-lg'>
                    <span>Rain Chance</span>
                    <span>{item.day.daily_chance_of_rain}%</span>
                  </div>
                </div>

              </div>
            </div>
          )
        })}
        <Buttons />
      </div>
    </>
  )
}

export default Forecast
