import React from 'react'

const Contact = ({person}) => {
    return(
        <>
            {person.name} {person.number}
        <br></br>
        </>
    )
}

const Contacts = ({persons}) => persons.map(a =>
        <Contact person={a} key={a.name} />
    )

export default Contacts