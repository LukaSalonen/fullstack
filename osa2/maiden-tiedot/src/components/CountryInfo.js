import React from 'react'
import Button from './Button'

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
                        {el.name} <Button text="show" countryName={el.name} setFilter={setFilter} />
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