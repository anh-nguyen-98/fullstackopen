import { useState, useEffect } from 'react';

import countryService from './services/country'
import weatherService from './services/weather'

const Country = ({ country, weather }) => {
  const flagStyle = {
    fontSize: 100
  }
  if (!country) return null
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>captital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h2>languages</h2>
      <ul>{Object.entries(country.languages).map(([code, lang]) => <li key={code}>{lang}</li>)}</ul>
      <span style={flagStyle}>{country.flag}</span>
      <Weather weather={weather} capital={country.capital[0]} />
    </div>
  )
}

const Weather = ({weather, capital}) => {
  if (!weather) {
    return null
  }
  return (
    <>
      <h2>Weather in {capital}</h2>
      <div>temperature {weather.main.temp} Celcius</div>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
      <div>wind {weather.wind.speed} ms/s</div>
    </>
  )
}

const SuggestedCountry = ( {country, handleShow} ) => {
  return (
    <>
      {country.name.common}
      <button onClick={() => handleShow(country)}>show</button>
    </>
  )
}

const SuggestingCountries = ({suggestions, handleShow}) => {
  if (suggestions.length >= 10) {
    return <div>Too many matches, specify another filter</div>
  }
  if (suggestions.length > 1 && suggestions.length < 10) {
    return (
      <>
        {suggestions.map((country) => <div><SuggestedCountry key={country.name.common} country={country} handleShow={handleShow}/></div>)}
      </>
    )
  }
  return null
}


const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService.getAll()
      .then(allCountries => {
        setCountries(allCountries)
    })
  }, [])

  useEffect(() => {
    if (country) {
      weatherService.getWeatherInfo(country.latlng[0], country.latlng[1])
        .then(data => setWeather(data))
    } else {
      setWeather(null)
    }
   
  }, [country])

  const handleInputChange = (event) => {
    let inputValue = event.target.value
    console.log(inputValue)
    setSearchTerm(inputValue)
    // reset
    setSuggestions([])
    setCountry(null)
    const matchedCountries = countries.filter(country => {
      const countryName = country.name && country.name.common
      return countryName.toLowerCase().includes(inputValue.toLowerCase())
    })
    console.log(`Handling input change: ${matchedCountries.length} potential countries`)
    if (matchedCountries.length === 1) {
      setCountry(matchedCountries[0])
    } else {
      setSuggestions(matchedCountries)
    }
  }

  const handleShow = (country) => {
    setSuggestions([])
    setCountry(country)
  }

  return (
    <div>
      find countries
      <input value={searchTerm} onChange={handleInputChange}></input>
      <SuggestingCountries suggestions={suggestions} handleShow={handleShow}/>
      <Country country={country} weather={weather}/>
    </div>
  );
}

export default App;
