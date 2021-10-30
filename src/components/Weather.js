import React, {useState} from 'react';
import './Weather.css';
import day from '../assets/day.jpg';
import night from '../assets/night.jpg';

const Weather = () => {
    // API INFO
    const weatherAPI = {
        key: "d976923e230349be8f07ad73b576d3f6",
        base: "https://api.openweathermap.org/data/2.5/"
      }
    // STATES
    const [query, setQuery] = useState('');
    const [isLoading, SetIsLoading] = useState(false);
    const [weather, setWeather] = useState({
        name: 'City',
        sys: {country: 'Country'},
        main: {temp: 0}
    });
    // AN IMAGE DURING THE DAY AND ANOTHER DURING THE NIGHT
    const image = (new Date().getHours()) > 12 ? day : night;
    // STYLE THE BACKGROUND IMAGE
    const backgroundCSS = {
        backgroundImage: `url(${image})`,
        width: '100%', 
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
    }
    // CONSTRUCT A DATE
    const DateMaker = (date) =>{
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let dayInLetters = days[date.getDay()];
        let dayNumber = date.getDate();

        let month = months[date.getMonth()];
        let year = date.getFullYear();

        return `${dayInLetters}, ${dayNumber} ${month} ${year}`;
    }
    // USE API TO GET THE TEMPERATURE
    const search = e => {
      if (e.key === "Enter") {
        SetIsLoading(true);
        fetch(`${weatherAPI.base}weather?q=${query}&units=metric&APPID=${weatherAPI.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            setQuery('');
            console.log(result);
            SetIsLoading(false);
          });
      }
    }
    return(
        <div style={backgroundCSS} className="weather">
                    <div className="weather-container">
                    <div className="search-input">
                        <input 
                        type="search" 
                        placeholder="Enter a country" 
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                        autoFocus 
                        />
                    </div>
                    <div className="country">{weather?.name} - {weather?.sys?.country}</div>
                    <div className="date">{DateMaker(new Date())}</div>
                    {
                        isLoading ? (<div class="lds-dual-ring"></div>) 
                        :
                        weather?.cod === "404" ? (
                            <div>
                                <span>{weather.message}</span>
                            </div>
                            )  
                            :
                            <div className="current"><span>{Math.round(weather?.main?.temp)}°c</span></div>
                    }

                    </div>
                </div>
        )
}
export default Weather;