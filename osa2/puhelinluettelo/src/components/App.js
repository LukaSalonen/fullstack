import React, { useState, useEffect } from 'react'
import Contacts from './Contact'
import Filter from './Filter'
import PersonForm from './PersonForm'
import personsService from '../services/persons'
import Notification from './Notification'
import '../App.css'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ currentFilter, setFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState({text:'', type:''})

  const updatePersons = () => {
    personsService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }

const updateNotification = (message, kind) => {
  setNotificationMessage({text:message, type:kind})
  setTimeout(() => {
    setNotificationMessage({text:'', type:''})
  }, 3000)
  
}

useEffect(updatePersons, [])

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
  const personObject = {name: newName, number: newNumber}

  if(persons.every(a => a.name !== personObject.name)) {
    personsService.create(personObject)
    .then(response => {
      updatePersons()
      updateNotification(`Added ${personObject.name}`, 'success')
    })
  } else {
    const replace = window.confirm(`${personObject.name} is already added to the phonebook, replace the old number with a new one?`)
    const old = persons.find(el => el.name === personObject.name)
    if(replace) {
      personsService
      .updatePerson(old.id, personObject)
      .then(() => {
        updatePersons()
        updateNotification(`Updated ${personObject.name}`, 'success')
      })
      .catch(error => {
        updateNotification(`Information of ${personObject.name} has already been removed from the server`, 'error')
    })
    }
  }
  setNewName('')
  setNewNumber('')
}

const contactsToShow = () => persons.filter(el => el.name.toLowerCase().indexOf(currentFilter.toLowerCase()) !== -1)

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notificationMessage} />
      <Filter currentFilter={currentFilter} handleFilter={handleFilter} />
      <h2>add a new </h2>
      <PersonForm 
        addNewContact={addNewContact}
        text1={newName} handleChange1={handleNewName}
        text2={newNumber} handleChange2={handleNewNumber} />
      <h2>Numbers</h2>
      <Contacts persons={contactsToShow()} setPersons={setPersons} update={updatePersons} notify={updateNotification} />
      
    </div>
  )

}

export default App