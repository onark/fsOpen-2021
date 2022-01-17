import React from 'react'
//import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

//const AnectodeForm = () => {
const AnectodeForm = (props) => {
    //const dispatch = useDispatch()

  const addAnectode = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    //dispatch(createAnecdote(content))
    props.createAnecdote(content)
    //dispatch(setNotification(`Anecdote '${content}' successfully added`))
    props.setNotification(`Anecdote '${content}' successfully added`, 5)
  }

  return (
    <form onSubmit={addAnectode}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}


const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}

const ConnectedAnectodeForm = connect(null, mapDispatchToProps)(AnectodeForm)
export default ConnectedAnectodeForm