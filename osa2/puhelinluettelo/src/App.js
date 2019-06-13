import React, { useState } from 'react'
import Contacts from './components/Contact'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ currentFilter, setFilter ] = useState('')

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