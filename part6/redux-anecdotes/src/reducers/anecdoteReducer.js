import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INCREMENT_VOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnectode = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1,
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnectode 
      )
     }
    default:
      return state
  }
}

export const anecdoteVote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: 'INCREMENT_VOTE',
      data: updatedAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export default anecdoteReducer