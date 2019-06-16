import React from 'react'
import personsService from '../services/persons'

const DeleteButton = ({person, update, notify}) => {

    const deleteContact = () => {
        const confirm = window.confirm(`Delete ${person.name} ?`)
        
            if(confirm) {
                personsService.deletePerson(person.id)
                .then(a => {
                    update()
                    notify(`Deleted ${person.name}`, 'success')
                })
            } 
    }

    return(
        <button onClick={deleteContact} > delete </button>
    )
}

const Contact = ({person, update, notify}) => {
    return(
        <>
            {person.name} {person.number} <DeleteButton person={person} update={update} notify={notify} />
        <br></br>
        </>
    )
}

const Contacts = ({persons, update, notify}) => persons.map(a =>
        <Contact person={a} key={a.id} update={update} notify={notify} />
    )

export default Contacts