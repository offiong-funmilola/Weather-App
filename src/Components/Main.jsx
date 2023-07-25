import React, { useContext, Fragment } from 'react'
import {FaSearch, FaCloudShowersHeavy } from 'react-icons/fa'
import WeatherContext from '../Context/WeatherContext'
import {MdOutlineCompress, MdSouth, MdVisibility, MdAir, MdDeviceThermostat, MdOutlineInvertColors, MdSunny, MdWbCloudy, MdRefresh} from "react-icons/md";
import {GiNightSky} from "react-icons/gi";
const RAIN = 'rain'
const CLOUD = 'cloud'
const SUN = 'sun'
const SKY = 'sky'

function Main() {
    const { geoData, isLoading, location, storedLocation, firstLetterUpper, setLocation, handleSubmit, isEmpty } = useContext(WeatherContext)
    const visibility = geoData ? geoData.visibility / 1000 : ''

    const showIcon = (weather) => {
        if (weather.includes(RAIN)) {
            return (<FaCloudShowersHeavy className='text-white text-12xl'/>)
        } else if (weather.includes(CLOUD)) {
            return (<MdWbCloudy className='text-white text-12xl'/>)
        } else if (weather.includes(SUN)) {
            return (<MdSunny className='text-white text-12xl'/>)
        } else if (weather.includes(SKY)) {
            return (<GiNightSky className='text-white text-12xl'/>)
        } else {
            return (<MdSunny className='text-white text-12xl'/>)
        }
    }
    
    return (
        <Fragment>
            {isLoading &&
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            }
            {isEmpty(geoData) && !isLoading &&
                <div className='w-full h-body flex items-center justify-center'>
                    <form onSubmit={handleSubmit} className='w-4/5 md:w-1/3 h-14 relative bg-white rounded-full border flex justify-center'>
                        <input type='text' placeholder='Enter City' className='rounded-l-full pl-8 w-1/2 text-lg bg-inherit focus:outline-none' value={location.city || ''} onChange={(e)=>{setLocation({...location, city: e.target.value})}}></input>
                        <input type='text' placeholder='Country' className='rounded-r-full w-1/2 text-lg bg-inherit focus:outline-none' value={location.country || ''} onChange={(e)=>{setLocation({...location, country: e.target.value})}}></input>
                        <button className='absolute right-2 text-black p-5' type="submit"><FaSearch /></button>  
                    </form> 
                </div>           
            }
            {!isEmpty(geoData) && !isLoading &&
                <div className='w-full grid grid-cols-6 grid-rows-8 md:grid-rows-7 gap-4 py-10 px-5 overflow-scroll'>
                    <div className='col-span-full row-start-1 row-end-5 md:row-start-1 md:row-end-7 md:col-start-1 md:col-end-5 bg-gradient-to-r bg-cyan-600 to-cyan-200 rounded-lg'>
                        <div className='w-full h-10 bg-cyan-900 rounded-t-lg flex justify-around items-center gap-1 px-5'>
                            <div className='w-4/5'>
                                <p className='font-sans text-lg font-bold text-white'>{geoData.name}, {storedLocation.country}</p>
                            </div>
                            <button className="button" onClick={handleSubmit}>
                                <MdRefresh className='text-white text-xl'/>
                            </button>
                        </div>
                        <div className='w-full px-5 flex flex-col-reverse items-center md:flex-row md:justify-between'>
                            <div className="info-container md:mt-7">
                                <h1 className='font-sans text-7xl md:text-9xl font-bold text-white md:mt-5'>{geoData.main.temp}<sup>o</sup></h1>
                                <h3 className='font-sans md:text-4xl text-3xl font-bold text-white mt-1 md:mt-5'>{firstLetterUpper(geoData.weather[0].description)}</h3>
                                <h3 className='font-sans text-1xl font-bold text-white mb-5 md:mb-0 md:mt-2'>
                                    Day {geoData.main.temp_max}<sup>o</sup>
                                    <span className='text-xl'> -</span> Night {geoData.main.temp_min}<sup>o</sup>
                                </h3>
                            </div>
                            <div className="icon-container md:w-1/3 md:mt-14 mb-6 mt-3 md:mb-0">
                                {showIcon(geoData.weather[0].description.toLowerCase())}
                            </div>
                        </div>
                    </div>  
                    <div className='col-span-full row-start-5 row-end-9 md:row-start-1 md:row-end-7 md:col-span-6 bg-white rounded-lg grid grid-cols-1 grid-rows-4 gap-2 pt-1'>
                        <div className='row-span-1'>
                            <h3 className='font-sans text-xl font-semibold ml-5'>Weather Today in {geoData.name}, {storedLocation.country}</h3>
                            <h1 className='font-sans text-4xl font-bold ml-7'>{geoData.main.feels_like}<sup>o</sup></h1>
                            <p className='font-sans text-xl ml-7'>Feels Like</p>
                        </div>
                        <div className='row-start-2 row-end-5 grid grid-cols-1 grid-rows-5'>
                            <div className='row-span-1 border-b border-gray-500 flex items-center justify-between px-5'>
                                <div className='flex gap-2'>
                                    <p><MdDeviceThermostat className='mt-1'/></p>
                                <p>High/Low</p>
                                </div>
                                <p>{geoData.main.temp_max}<sup>o</sup>/{geoData.main.temp_min}<sup>o</sup></p>
                            </div>
                            <div className='row-span-1 border-b border-gray-500 flex items-center justify-between px-5'>
                                <div className='flex gap-2'>
                                    <p><MdOutlineInvertColors className='mt-1'/></p>
                                <p>Humidity</p>
                                </div>
                                <p>{geoData.main.humidity}%</p>
                            </div>
                            <div className='row-span-1 border-b border-gray-500 flex items-center justify-between px-5'>
                            <div className='flex gap-2'>
                                    <p><MdOutlineCompress className='mt-1'/></p>
                                <p>Pressure</p>
                                </div>
                                <div className='flex'>
                                    <p><MdSouth className='mt-1'/></p>
                                    <p>{geoData.main.pressure}<span className='ml-1'>mb</span></p>
                                </div>
                            </div>
                            <div className='row-span-1 border-b border-gray-500 flex items-center justify-between px-5'>
                                <div className='flex gap-2'>
                                    <p><MdVisibility className='mt-1'/></p>
                                <p>Visibility</p>
                                </div>
                                <p>{visibility}<span className='ml-1'>Km</span></p>
                            </div>
                            <div className='row-span-1 flex items-center justify-between px-5'>
                                <div className='flex gap-2'>
                                    <p><MdAir className='mt-1'/></p>
                                <p>Wind</p>
                                </div>
                                <p>{geoData.wind.speed}<span className='ml-1'>Km/h</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default Main