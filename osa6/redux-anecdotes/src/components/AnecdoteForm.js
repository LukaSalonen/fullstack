import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({store}) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    store.dispatch(createAnecdote(content))
    event.target.anecdote.value = ''
  } 

  return(
    <>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button> 
      </form>
    </>
  )
}

export default AnecdoteForm