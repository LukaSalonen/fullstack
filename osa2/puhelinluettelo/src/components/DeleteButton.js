import React from 'react'
import personsService from '../services/persons'

const DeleteButton = ({person, update}) => {

    const deleteContact = () => {
        const confirm = window.confirm(`Delete ${person.name} ?`)
        
            if(confirm) {
                personsService.deletePerson(person.id)
                .then(a => update())
            } 
    }

    return(
        <button onClick={deleteContact} > delete </button>
    )
}

export default DeleteButton