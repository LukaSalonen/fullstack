import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.createAnecdote(content)
    props.setNotification(`you added '${content}'`)
    setTimeout(() => {
      props.resetNotification()
    }, 5000)
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

const mapDispatchToProps = {
  setNotification,
  resetNotification,
  createAnecdote,
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)