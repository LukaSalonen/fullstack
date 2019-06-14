import React from 'react'
import DeleteButton from './DeleteButton'

const Contact = ({person, update}) => {
    return(
        <>
            {person.name} {person.number} <DeleteButton person={person} update={update} />
        <br></br>
        </>
    )
}

const Contacts = ({persons, update}) => persons.map(a =>
        <Contact person={a} key={a.id} update={update} />
    )

export default Contacts