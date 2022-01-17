import React, {useEffect} from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnectodeForm from './components/AnectodeForm'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])
  return (
    <div>
      <Notification />
      <AnecdoteList />
      <AnectodeForm  />
    </div>
  )
}

export default App