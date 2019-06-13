import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Filter from './Filter'
import CountryInfo from './CountryInfo'

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ currentFilter, setFilter ] = useState('')

  useEffect(() => {
    Axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = () => countries.filter(el => el.name.toLowerCase().indexOf(currentFilter.toLowerCase()) !== -1)

  return(
    <div>
      <Filter currentFilter={currentFilter} handleFilter={handleFilter} />
      <br></br>
      <CountryInfo countries={countriesToShow()} setFilter={setFilter} />
    </div>
  )
}

export default App
