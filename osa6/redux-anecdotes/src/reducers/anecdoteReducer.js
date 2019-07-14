import anecdoteService from '../services/anecdotes'

export const voteFor = (id) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdote = anecdotes.find(el => el.id === id)
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    anecdoteService.update(newAnecdote)
    dispatch({
      type: 'INCREMENT_VOTE',
      data: newAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () =>  {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INCREMENT_VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote)
    case 'INIT_ANECDOTES':
      return action.data
    default: 
      return state
  }
}

export default anecdoteReducer