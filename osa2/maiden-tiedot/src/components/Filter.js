import React from 'react'

const Filter = ({currentFilter, handleFilter}) => {
    
    return (
        <>
            filter countries <input value={currentFilter} onChange={handleFilter} />
        </>
    )
}

export default Filter