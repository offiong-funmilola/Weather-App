import React from 'react'
import globe from './Assets/globe.jpeg'
import {FaSearch} from 'react-icons/fa'
import WeatherContext from '../Context/WeatherContext'
import {useContext} from 'react'

function Menu() {
    const {location, setLocation, isLoading, handleSubmit, geoData, isEmpty} = useContext(WeatherContext)
  return (
    <nav className='w-full bg-blue-950 flex items-center justify-between p-5 h-menu'>
        <div className='w-20 h-15 text-white bg-inherit'>The Weather Channel</div>
        {!isEmpty(geoData) && !isLoading &&
            <form onSubmit={handleSubmit} className='w-1/3 h-8 relative bg-inherit rounded-full border flex justify-center'>
                <input type='text' placeholder='Search City' className='w-36 text-white text-lg bg-inherit focus:outline-none' value={location.city || ''} onChange={(e)=>{setLocation({...location, city: e.target.value})}}></input>
                <input type='text' placeholder='Country' className='w-36  text-white text-lg bg-inherit focus:outline-none' value={location.country || ''} onChange={(e)=>{setLocation({...location, country: e.target.value})}}></input>
                <button className='absolute top-0 right-5 translate-y-2 text-white' type="submit"><FaSearch /></button>  
            </form>
        }
        <div className='w-32 h-10 bg-inherit flex items-center justify-around'>
            <div className='w-8 h-8'><img src={globe} alt=''/></div>
            <p className='text-white text-lg'>Globe</p>
            <div className='h-5 border border-white'></div>
            <p className='text-white text-lg'><sup>o</sup>C</p>
        </div>
    </nav>
  )
}

export default Menu