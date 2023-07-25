import React from 'react'
import globe from './Assets/globe.jpeg'
import {FaSearch} from 'react-icons/fa'
import WeatherContext from '../Context/WeatherContext'
import {useContext} from 'react'
import {RxReset} from 'react-icons/rx'

function Menu() {
    const {location, setLocation, isLoading, handleSubmit, geoData, isEmpty, handleReset} = useContext(WeatherContext)
  return (
    <nav className='w-full bg-blue-950 flex items-center justify-between p-5 h-menu'>
        <div className='w-20 h-15 text-white bg-inherit'>The Weather Channel</div>
        {!isEmpty(geoData) && !isLoading &&
            <form onSubmit={handleSubmit} className='w-2/3 md:w-1/3 h-8 relative bg-inherit rounded-full border flex justify-center'>
                <input type='text' placeholder='Enter City' className='rounded-l-full pl-6 w-1/2 text-white text-lg bg-inherit focus:outline-none' value={location.city || ''} onChange={(e)=>{setLocation({...location, city: e.target.value})}}></input>
                <input type='text' placeholder='Country' className='rounded-r-full w-1/2 text-white text-lg bg-inherit focus:outline-none' value={location.country || ''} onChange={(e)=>{setLocation({...location, country: e.target.value})}}></input>
                <button className='absolute right-1 text-white p-2' type="submit"><FaSearch /></button>  
            </form>
        }
        <div className='hidden md:w-40 h-10 bg-inherit md:flex items-center justify-between'>
                <div className='md:w-10 h-8'><img src={globe} alt=''/></div>
                <p className='text-white text-lg'>Globe</p>
                <div className='h-5 border border-white'></div>
                <p className='text-white text-lg'><sup>o</sup>C</p>
                <div className='h-5 border border-white mr-2'></div>
            <p className='text-white text-lg font-semibold' onClick={handleReset}><RxReset /></p>
        </div>
        <div className='w-10 h-10 flex items-center justify-end md:hidden'>
            <p className='text-white text-lg font-semibold' onClick={handleReset}><RxReset /></p>
        </div>
    </nav>
  )
}

export default Menu