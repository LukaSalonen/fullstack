import React from 'react'

const Filter = ({currentFilter, handleFilter}) => {
    
    return (
        <>
            filter shown with <input value={currentFilter} onChange={handleFilter} />
        </>
    )
}

export default Filter