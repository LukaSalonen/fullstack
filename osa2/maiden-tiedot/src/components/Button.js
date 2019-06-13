import React from 'react'

const Button = ({text, countryName, setFilter}) => {
    return(
        <>
            <button onClick={() => setFilter(countryName)}>{text}</button>
        </>
    )

}

export default Button