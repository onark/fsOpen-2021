import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import personService from './services/persons'

const Person = ({ personObj, removeP }) => {
  return (
    <div>
      {personObj.name} {personObj.number}
      <button onClick={() => removeP(personObj)}>Delete</button>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const successMessage = {
    color: 'white',
    background: 'green',
    fontStyle: 'italic',
    fontSize: 20
  }
  const errorMessage = {
    color: 'white',
    background: 'red',
    fontStyle: 'italic',
    fontSize: 40
  }
  return (
    <div style={message.includes('error') ? errorMessage : successMessage}>
      <p>{message}</p>
    </div>
  )
}

const Filter = ({ filterValue, onFilterTextChange }) => {
  return (
    <form>
      <div>
        Filter:
          <input
          value={filterValue}
          onChange={onFilterTextChange} />
      </div>
    </form>
  )
}

const Form = ({ submitFunc, name, changeName, number, changeNumber }) => {
  return (
    <form onSubmit={submitFunc}>
      <h2>Add New</h2>
      <div>
        Name:
          <input
          value={name}
          onChange={changeName} />
      </div>
      <div>
        Number:
          <input
          value={number}
          onChange={changeNumber} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, removePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map(person =>
        <Person personObj={person} key={person.id} removeP={removePerson} />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [filterText, setFilterText] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name === newName)
    if (existingPerson) {
      const updatedPerson = { ...existingPerson, number: newNumber }
      personService
        .update(existingPerson.id, updatedPerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data));
          setSuccessMessage(`${updatedPerson.name}s number updated`);
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000);
        })
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data));
          setSuccessMessage(`${personObject.name} is added`);
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000);
          return response;
        })
        .catch (
          error => {
            setErrorMessage(`error: ${error.response.data.error}`)
            console.log(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000);
          }
        )
    }
    setNewName('');
    setNewNumber('');
  }

  const deletePerson = ({name, id}) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter(person => person.id !== id));
      }).catch (
        error => {
          setErrorMessage(`error deleting user ${name}`)
          console.log(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000);
        }
      )
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().indexOf(filterText) > -1)

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage || errorMessage} />
      <Filter filterValue={filterText} onFilterTextChange={handleFilterTextChange} />
      <Form submitFunc={addPerson} name={newName} changeName={handleNameChange} number={newNumber} changeNumber={handleNumberChange} />
      <Persons persons={filteredPersons} removePerson={deletePerson} />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))