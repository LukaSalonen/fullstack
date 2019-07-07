import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'

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

const AnecdoteList = ({store}) => {

  const anecdotes = store.getState().sort((a,b) => {
    return b.votes - a.votes
  })

  return (
    <>
      {anecdotes.map(an =>
        <SingleAnecdote
          key={an.id}
          anecdote={an}
          handleClick={() => 
            store.dispatch(voteFor(an.id))
          }
        />
      )}
    </>
  )
}

export default AnecdoteList 