import React from 'react'

const Button = ({countryName, setFilter}) => {
    return(
        <>
            <button onClick={() => setFilter(countryName)}>show</button>
        </>
    )

}

export default Button