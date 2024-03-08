import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useCallback } from 'react'
import Buttons from './Buttons'
import { useSelector } from 'react-redux'

const Detail = () => {
  const latAdd = useSelector((state) => state.address.lat)
  const lonAdd = useSelector((state) => state.address.lon)
  const [weatherdata, setWeatherdata] = useState([])
  const [lat, setLat] = useState(latAdd)
  const [lon, setLon] = useState(lonAdd)

  // let { lat, lon } = useParams()



  let apiKey = "b3c346dd899aaf4ef76a357d54ebc7fe"
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

  let date = new Date()
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()]
  let todayDate = date.getDate()
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[date.getMonth()]
  let year = date.getFullYear()



  const getDetails = async () => {
    let data = await fetch(url)
    let response = await data.json()

    setWeatherdata([...weatherdata, response])

    // console.log(weatherdata.weather[0].main)

  }

  useEffect(() => {
    getDetails()
  }, [apiKey, lat, lon])






  return (
    <>
      {weatherdata.map((item, index )=> {
        return (
          <div key={index} className='main'>
            <div className="upper rounded-t-md md:w-[50%] w-[80%] mx-auto my-5 flex flex-col gap-16 p-5 bg-[url('/bgdetail.jpg')] bg-center">
              <div className="date-location flex flex-col">
                <div className='day text-lg font-bold'>{day}</div>
                <div className='full-date flex gap-1 text-sm'>
                  <span>{todayDate}</span>
                  <span>{month}</span>
                  <span>{year}</span>
                </div>
                <div className='loction flex gap-1'>
                  <span>{item.name},</span>
                  <span>{item.sys.country}</span>
                </div>
              </div>
              <div className='temprature flex flex-col'>
                <span className='font-bold text-lg'>{Math.floor(item.main.temp)}℃</span>
                <span>{item.weather[0].main}</span>
                <span>{item.weather[0].description}</span>
              </div>
            </div>

            <div className='down'>
              <div className='other bg-black p-3 w-[81%] md:w-[50%] mx-auto my-[-20px] rounded-b-md'>
                <div className='humidity flex justify-between font-bold text-lg'>
                  <span>Humidity</span>
                  <span>{item.main.humidity}%</span>
                </div>

                <div className='wind flex justify-between font-bold text-lg'>
                  <span>Wind</span>
                  <span>{item.wind.speed} m/ph</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
      <Buttons/>
    </>
  )
}

export default Detail
