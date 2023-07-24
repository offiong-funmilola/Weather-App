import React from "react";
import { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';

const PRODUCTION = "PRODUCTION";
const WeatherContext = createContext();
const ENVIRONMENT = process.env.ENVIRONMENT;
const API_ENDPOINT = "http://localhost:3050"

if (ENVIRONMENT === PRODUCTION) {
    API_ENDPOINT = `${window.location.href}/api`
}

export const WeatherProvider = ({children}) => {
    const [location, setLocation] = useState({})
    const [storedLocation, setStoredLocation] = useState({})
    const [geoData, setGeoData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEmpty(location) && isEmpty(storedLocation)) {
            return
        }

        fetch(`${API_ENDPOINT}/weather-data`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(!isEmpty(location) ? location : storedLocation)
        }).then(res => res.json())
        .then(data => {
            if (data.cod !== "200" && data.cod !== 200) {
                toast(firstLetterUpper(data.message))
                return
            }
            setGeoData(data)
            setStoredLocation(!isEmpty(location) ? {...location} : {...storedLocation})
        });
    }

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }

    const firstLetterUpper = (str) => {
        if (str) {
            str = str.toLowerCase().split(' ');
            for (var i = 0; i < str.length; i++) {
                str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
            }
            return str.join(' ');    
        }
    }

    useEffect(() => {
        if (!isEmpty(geoData)) {
            localStorage.setItem('geoData', JSON.stringify(geoData));
        }
        if (!isEmpty(storedLocation)) {
            localStorage.setItem('storedLocation', JSON.stringify(storedLocation));
        }
    }, [geoData, storedLocation]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('geoData'));
        if (data && !isEmpty(data)) {
            setGeoData(data)
        }
        const currentLocation = JSON.parse(localStorage.getItem('storedLocation'));
        if (currentLocation && !isEmpty(currentLocation)) {
            setStoredLocation(currentLocation)
        }
        setIsLoading(false)
    }, []);

    const handleReset = () => {
        localStorage.setItem('geoData', '{}');
        localStorage.setItem('storedLocation', '{}');
        setGeoData({})
        setLocation({})
    };

    return (
        <WeatherContext.Provider value={{location, setLocation, handleSubmit, handleReset, geoData, storedLocation, isLoading, firstLetterUpper, isEmpty}}>
            {children}
        </WeatherContext.Provider>
    )
}
export default WeatherContext



