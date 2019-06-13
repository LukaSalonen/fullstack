import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Button from './Button'

const Weather = ({city}) => {

    const [ forecast, setForecast ] = useState()

    useEffect(() => {
        Axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=39f3a9ecf4d117829362f6fdef22b315`)
          .then(response => {
            setForecast(response.data)
          })
      }, [city])


      if (forecast === undefined) {
        return(
            <>
            </>
        )
    } else {
        return(
            <>
            <h2>{`Weather in ${city}`}</h2>
            <b>temperature: </b> {Math.round(forecast.main.temp - 273.15)} Celsius
            <br></br>
            <img src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} alt="icon not found" width='80' />
            <br></br>
            <b>wind: </b> {forecast.wind.speed} m/s
            </>
        )
    }
}

const CountryData = ({country}) => {
    return(
        <>
            <h1>{country.name} </h1>
            capital {country.capital}
            <br></br>
            population {country.population}
            <h2>languages</h2>
            <ul>
                {country.languages.map(el => 
                <li key={el.name}>{el.name}</li>
                )}
            </ul>
            
            <br></br>
            <img src={country.flag} alt="no pic sorry mate" width="200" />
            <br></br>
            <Weather city={country.capital} />
        </>
    )
}

const CountryInfo = ({countries, setFilter}) => {



    if(countries.length > 10) {
        return (
            <>
                Too many matches, specify another filter
            </>
        )
    }else if(countries.length > 1 && countries.length < 10) {
        return (
            <>
                {countries.map(el => 
                    <div key={el.name}>
                        {el.name} <Button countryName={el.name} setFilter={setFilter} />
                    </div>
                    )}
            </>
        )
    } else if (countries.length === 1) {
        return(
            <>
                <CountryData country={countries[0]} />
            </>
        )
    } else {
        return (
            <>
            </>
        )
    }
}

export default CountryInfo