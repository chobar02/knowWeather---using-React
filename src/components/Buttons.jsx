import React from 'react'
import { Link } from 'react-router-dom'

const Buttons = () => {
    return (
        <div className='w-[80%] md:w-[50%] flex flex-col gap-3 items-center  mx-auto my-10'>
            <Link to="/">
                <button className='bg-red-700 hover:bg-red-400 px-4 py-2 rounded-md font-semibold text-[17px] border-solid border-red-700 hover:border-red-400'>
                    Update Loction
                </button>
            </Link>

            <Link to="/detail">
                <button className='bg-blue-700 hover:bg-blue-400 px-4 py-2 rounded-md font-semibold text-[17px] border-solid border-blue-700 hover:border-blue-400'>
                    Current Weather
                </button>
            </Link>

            <Link to="/hourly">
                <button className='bg-blue-700 hover:bg-blue-400 px-4 py-2 rounded-md font-semibold text-[17px]'>
                    24 Hour Forecast
                </button>
            </Link>

            <Link to="/forecast">
                <button className='bg-blue-700 hover:bg-blue-400 px-4 py-2 rounded-md font-semibold text-[17px]'>
                   5 Days Forecast 
                </button>
            </Link>
        </div>
    )
}

export default Buttons
