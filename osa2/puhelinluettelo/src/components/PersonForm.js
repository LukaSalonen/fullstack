import React from 'react'

const FormField = ({text, stuff, handleChange}) => {
    return (
        <div>
            {text} <input value={stuff} onChange={handleChange} />
        </div>
    )
}

const PersonForm = ({addNewContact, text1, handleChange1, text2, handleChange2}) => {
    return(
        <>
            <form onSubmit={addNewContact}>
                <FormField text="name: " stuff={text1} handleChange={handleChange1} />
                <FormField text="number: " stuff={text2} handleChange={handleChange2} />
                <button type="submit">add</button>
            </form>
        </>
    )
}

export default PersonForm