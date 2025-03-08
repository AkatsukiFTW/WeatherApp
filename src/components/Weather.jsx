import React, { useRef, useEffect, useState } from 'react'
import fewclouds from '../assets/images/fewclouds.jpg'
import clearsky from '../assets/images/clearsky.jpg'
import rain from '../assets/images/rain.jpg'
import snow from '../assets/images/snow.jpg'
import scatteredclouds from '../assets/images/scatteredclouds.jpg'
import brokeclouds from '../assets/images/brokenclouds.jpg'
import thunderstorm from '../assets/images/thunderstorm.avif'
import mist from '../assets/images/mist.jpg'
import overcastclouds from '../assets/images/overcastclouds.jpg'
import search from '../assets/images/search.png'
import humidity from '../assets/images/humidity.png'
import wind from '../assets/images/wind.png'
import activities from '../activities.js'

const Weather = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDay()+2;
    const year = date.getFullYear();
    const getMonthofTheYear = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthName = getMonthofTheYear[date.getMonth()];

    const [weatherData, setWeatherData] = useState(false);
    const [city, setCity] = useState('');

    const searchCity = async (city) => {
        try {
            const apiKey = import.meta.env.VITE_APP_API_KEY;
            if (!apiKey) throw new Error("API key is missing");
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setWeatherData({
                humidity: data.main.humidity,
                temperature: Math.floor(data.main.temp),
                description: data.weather[0].description,
                wind: data.wind.speed,
                main: data.weather[0].main,
                city: data.name,
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        searchCity('London');
    }, []);

    function handleChange(event) {
        setCity(event.target.value);
    }

    return (
        <div>
            <div className="background" 
                style={{
                    backgroundImage: weatherData.main === 'Snow' ? `url(${snow})`
                        : weatherData.main === 'Rain' ? `url(${rain})`
                        : weatherData.description === 'few clouds' ? `url(${fewclouds})`
                        : weatherData.description === 'clear sky' ? `url(${clearsky})`
                        : weatherData.description === 'scattered clouds' ? `url(${scatteredclouds})`
                        : weatherData.description === 'broken clouds' ? `url(${brokeclouds})`
                        : weatherData.main === 'Thunderstorm' ? `url(${thunderstorm})`
                        : weatherData.description === 'mist' ? `url(${mist})`
                        : weatherData.description === 'overcast clouds' ? `url(${overcastclouds})`
                        : null
                }}>
                <div className='container'> 
                    <div className='date'>
                        <p style={{ marginRight: "50px" }}>{day} {monthName} {year}</p>
                        <p>{hours}:{minutes}</p>
                    </div>

                    <div className='info'>
                        
                        <div className='info-container'>
                            <div className='search'>
                                <input 
                                    value={city} 
                                    onChange={handleChange} 
                                    className="inputSearch" 
                                    type='text' 
                                    placeholder='Search for places...' 
                                />
                                <button 
                                    className='searchBtn' 
                                    onClick={() => searchCity(city)}
                                >
                                    <img src={search} />
                                </button>
                            </div>
                            <div className='weather-info'>
                            <div className='town'>
                                <h1 style={{ color: weatherData.description === 'broken clouds' ? "#424242" : "white" }}>
                                    {weatherData.city}
                                </h1>
                            </div>

                            <div className='temperature'>
                                <p style={{ color: weatherData.main === 'Rain' ? "white" : "#424242" }}>
                                    {weatherData.temperature}°C
                                </p>
                            </div>

                            <div className='description'>
                                <p style={{ color: weatherData.main === 'Rain' ? "white" : "#424242" }}>
                                    {weatherData.description}
                                </p>
                            </div>

                            <div className='hw-info'>

                                <div className='humidity'>
                                    <p style={{ color: weatherData.main === 'Rain' ? "white" : "#424242" }}>
                                        <img className='icon' src={humidity} /> {weatherData.humidity}%
                                    </p>
                                </div>
                                <div className='wind'>
                                    <p style={{ color: weatherData.main === 'Rain' ? "white" : "#424242" }}>
                                        <img className="icon" src={wind} /> {weatherData.wind} km/h
                                    </p>
                                </div>
                            </div>
                            </div>
                        </div>   
                    </div>
                </div>

                <div className='activities'>
                    <div className='activity'>
                        <h1 style={{ color: weatherData.main === 'Rain' ? 'white' : 'black' }}>Activities</h1>
                        <div className='activity-container'>
                            <div className='activity-box'>
                                {weatherData.main && activities[0]?.[weatherData.main] ? (
                                    <div>
                                        <ul>
                                            {activities[0][weatherData.main].map((activity, index) => (
                                                <li 
                                                    key={index} 
                                                    style={{ color: weatherData.main === 'Rain' ? 'white' : '#424242' }}
                                                >
                                                    {activity}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;
