import React, { useState, useEffect } from 'react'
import Contacts from './Contact'
import Filter from './Filter'
import PersonForm from './PersonForm';
import Axios from 'axios';

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ currentFilter, setFilter ] = useState('')

useEffect(() => {
  Axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
}, [])

const handleNewName = (event) => {
  setNewName(event.target.value)
}
const handleNewNumber = (event) => {
  setNewNumber(event.target.value)
}

const handleFilter = (event) => {
  setFilter(event.target.value)
}

const addNewContact = (event) => {
  event.preventDefault()
  if(persons.every(a => a.name !== newName)) {
    const personObject = {name: newName, number: newNumber}
    setPersons(persons.concat(personObject))
  } else {
    window.alert(`${newName} is already added to phonebook`)
  }
  setNewName('')
  setNewNumber('')
}

const contactsToShow = () => persons.filter(el => el.name.toLowerCase().indexOf(currentFilter.toLowerCase()) !== -1)

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter currentFilter={currentFilter} handleFilter={handleFilter} />
      <h2>add a new </h2>
      <PersonForm 
        addNewContact={addNewContact}
        text1={newName} handleChange1={handleNewName}
        text2={newNumber} handleChange2={handleNewNumber} />
      <h2>Numbers</h2>
      <Contacts persons={contactsToShow()} />
      
    </div>
  )

}

export default App