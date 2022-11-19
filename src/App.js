import React, { useState } from 'react'
import axios from 'axios'
import './App.css';

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=18384776511e007523797f7cfd3e279e`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
      })
      setLocation('')
    }

  }

  return (
    <div className="app">
      <div className='search'>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter City"
          type="text" />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{parseInt((data.main.temp) - 273)}°C</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined && 
        <div className='bottom'>
        <div className='feels'>
          {data.main ? <p className='bold'>{parseInt((data.main.feels_like) - 273)}°C</p> : null}
          <p>Feels Like</p></div>
        <div className='humidity'>
          {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
          <p> Humidity</p></div>
        <div className='wind'>
          {data.wind ? <p className='bold'>{parseInt(data.wind.speed)}MPH</p> : null}
          <p>Wind Speed</p></div>
      </div>
      
      }   
      </div>
    </div>
  );
}

export default App;
