import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch()
    const voteHandler = () => {
        dispatch(anecdoteVote(anecdote))
        dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
      }
    return (
        <li>
            {anecdote.content}
            <strong> {anecdote.votes}</strong>
            <button onClick={voteHandler}>vote</button>
        </li>
    )
}

const AnecdoteList = () => {
    
    const anecdotes = useSelector(state => state.anecdotes)

    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes.map(anecdote =>
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        votes={anecdote.votes}
                    />
                )}
            </ul>
        </div>
    )
}

export default AnecdoteList