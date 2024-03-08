import React from 'react'
import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLat, setLon } from '../redux/address/addressSlice'

const Home = () => {
    const [query, setQuery] = useState("")
    const [resone, setResone] = useState([])
    const dispatch = useDispatch()

    let apiKey = "b3c346dd899aaf4ef76a357d54ebc7fe"
    let laturl = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`


    const handleInput = (e) => {
        setQuery(e.target.value)
    }

    const handleSearch = useCallback(async () => {

        let places = await fetch(laturl)
        let res = await places.json()
        console.log(res)
        setResone(res)


    }, [query, apiKey])

    

    return (
        <>
            <div className='flex flex-col gap-5 mt-5 lg:w-3/5 mx-auto'>
                <div className='logo flex items-center gap-2 '>
                    <div className='w-15'>
                        <img className='rounded-full' src="/8504201.jpg" alt="" width="35" />
                    </div>
                    <h2 className='font-bold text-lg'>knowWeather</h2>
                </div>

                <div className='flex w-11/12 mx-auto'>
                    <input onChange={handleInput} value={query} className='text-black font-semibold text-lg outline-none placeholder:text-gray-700 rounded-sm w-full pl-2 pr-9 py-1' type="text" placeholder='search city name' />
                    <button onClick={handleSearch} className='cursor-pointer ml-[-30px]'><img src="https://cdn.hugeicons.com/icons/search-01-stroke-rounded.svg" alt="search-01" width="24" height="24" /></button>
                </div>

                <div className='intial-results flex flex-col gap-3'>
                    {resone.map(item => {
                        return (
                            <Link key={item.lat} onClick={() => {
                                dispatch(setLat(item.lat))
                                dispatch(setLon(item.lon))
                            }} to={`/detail`}><div className='flex gap-1 p-2 bg-red-600 w-[80%] md:w-[60%] lg:w-1/2 m-auto rounded-sm items-center'>
                                    <span className='text-lg font-bold'>{item.name},</span>
                                    <span className='font-semibold'>{item.state},</span>
                                    <span>{item.country}</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>

            </div>
        </>
    )
}

export default Home
