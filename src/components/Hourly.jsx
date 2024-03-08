import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import Buttons from "./Buttons"
import { useSelector } from 'react-redux'


const Hourly = () => {

    const [hourlyForcast, setHourlyForcast] = useState([])
    const [res, setRes] = useState([])
    let lat = useSelector(state => state.address.lat)
    let lon = useSelector(state => state.address.lon)
    let apiKey = "b3c346dd899aaf4ef76a357d54ebc7fe"
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=8&appid=${apiKey}&units=metric`

    const getHourlyForcast = useCallback(async () => {
        let data = await fetch(url)
        let response = await data.json()
        setHourlyForcast(response.list)
        setRes([...res, response])
        


    }, [lat, lon, apiKey, url])

    useEffect(() => {
        getHourlyForcast()
    }, [])

    


    return (
        <>
            <div className="main flex flex-col gap-5">
                {hourlyForcast.map(item => {
                    return (
                        <div key={item.dt} className="results">
                            <div className="upper rounded-t-md md:w-[50%] w-[80%] mx-auto my-5 flex flex-col gap-16 p-5 bg-[url('/bgdetail.jpg')] bg-center">
                                <div className="date-location flex flex-col">
                                    <div className='day text-lg font-bold'>{item.dt_txt.split(" ")[1]}</div>
                                    <div className='day text-lg font-bold'>{item.dt_txt.split(" ")[0]}</div>
            
                                    <div className='loction flex gap-1'>
                                        <span>{res[0].city.name},</span>
                                        <span>{res[0].city.country}</span>
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
            </div>
        </>
    )
}

export default Hourly
