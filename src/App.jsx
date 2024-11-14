import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import sunnyImg from './assets/sunny.png';
import cloudyImg from './assets/cloudy.png';
import rainyImg from './assets/rainy.png';
import thunderstormImg from './assets/thunder.png';
import defaultImg from './assets/default.png'; 


function App() {
    const [city,setCity] = useState('')
    const [temp,setTemp] = useState('0')
    const [feelLikeTemp,setfeelLikeTemp] = useState('0')
    const [weather,setWeather] = useState('')
    const [weatherImage,setWeatherImage] = useState('')
    const [day,setDay] = useState('')
    const [date,setDate] = useState('')
    const [curTime,setCurTime] = useState('')


    useEffect(()=>{
      DateAndTime()
      setWeatherImage(defaultImg)
    },[])
    
    const DateAndTime = async () => {

      const sysDateTime = new Date();

      const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const dayOfWeek = daysOfWeek[sysDateTime.getDay()];
      const dayOfMonth = sysDateTime.getDate();
    
      let hours = sysDateTime.getHours();
      const minutes = sysDateTime.getMinutes().toString().padStart(2, "0");
      const amPm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const time = `${hours}:${minutes} ${amPm}`;
    
      setDay(dayOfWeek)
      setDate(dayOfMonth)
      setCurTime(time)
      
    }
    
   const fetchWeather = async () => {

    if(city) {
      const API_KEY = '4c6f432811d059736e6cafde29d9ef0a'; 
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setTemp(response.data.main.temp)
      setfeelLikeTemp(response.data.main.feels_like)
      
      setWeather(response.data.weather[0].main);
      const weatherCondition = response.data.weather[0].main.toLowerCase();
      if (weatherCondition.includes('clear')) {
        setWeatherImage(sunnyImg);
      } else if (weatherCondition.includes('clouds')) {
        setWeatherImage(cloudyImg);
      } else if (weatherCondition.includes('rain')) {
        setWeatherImage(rainyImg);
      } else if (weatherCondition.includes('thunderstorm')) {
        setWeatherImage(thunderstormImg);
      }
    } 
    catch (err) {
      console.log("Error on fetching data");
    }
    }
    else {
      alert("Enter city name")
    }
    
   }

  return (
    <>
      <div className="App weather-container">
        <h1 style={{fontSize:'50px'}} className='text-center text-white fw-semibold pt-5'>Weather App</h1>
        {/* content */}
        <div className="weather-content d-flex justify-content-center gap-5 text-center">
          {/* date */}
          <div className="weather-date">
            <h1 className='text-white'>{day} {date}</h1>
            <p className='text-white fs-5 fw-semibold'>{curTime}</p>
          </div>
          {/* icon */}
          <div className="weather-icon">
            <img src={weatherImage} alt="Weather Icon" />
            <p className='text-white fs-5 fw-semibold'>{weather}</p>
          </div>
          {/* temp */}
          <div className="weather-temp">
            <h1 className='text-white'>{temp}°C</h1>
            <p className='text-white fs-5 fw-semibold'>Feels Like {feelLikeTemp}°C</p>
          </div>
        </div>
        {/* search box */}
        <div className='searchBox text-center'>
          <input onChange={(e)=>setCity(e.target.value) } style={{width:'350px'}} className='px-4 py-3 border rounded' type="text" placeholder='Enter City Name' />
          <button onClick={fetchWeather} className='ms-4 px-5 py-3 rounded bg-dark text-white'>Search</button>
        </div>
      </div>
    </>
  );
}

export default App
