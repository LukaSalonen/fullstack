import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const SingleAnecdote = ({ anecdote, handleClick }) => {
  return (
    <>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </>
  )
}

const AnecdoteList = (props) => {

  const handleLike = (anecdote) => {
    props.voteFor(anecdote.id)
    props.setNotification(`you voted '${anecdote.content}'`, 1000)
  }

  return (
    <>
      {props.visibleAnecdotes.map(an =>
        <SingleAnecdote
          key={an.id}
          anecdote={an}
          handleClick={() => handleLike(an)}
        />
      )}
    </>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => anecdotes.filter(el => el.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1).sort((a,b) => {return b.votes - a.votes})

const mapDispatchToProps = { 
  setNotification,
  voteFor,
 }

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)