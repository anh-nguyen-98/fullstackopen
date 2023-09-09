import { useEffect, useState } from 'react'
import personService from './services/person'

const Filter = ( { searchTerm, handleSearchTermChange }) => {
  return (
    <div>
        filter shown with <input value ={searchTerm} onChange={handleSearchTermChange} />
    </div>
  )
}

const PersonForm = ({ handleSubmit, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}


const Person = ({ person, handleDeletePerson }) => {
  return (
    <>
      <div>
        {person.name} {person.number}
        <button type="submit" onClick={() => handleDeletePerson(person.id, person.name)}>delete</button>
      </div>

    </>
  )
}

const Persons = ({ personsToShow, handleDeleteOf }) => {
  return (
    <div>
      {personsToShow.map(person => <Person key={person.id} person={person} handleDeletePerson={handleDeleteOf}/>)}
    </div>
     
  )
}

const Notification  = ( {isError, message} ) => {
  const notiStyle = {
    color: isError ? 'red': 'green',
    fontStyle: 'bold',
    background: 'lightgrey',
    fontSize: 20,
    border: isError ? '5px solid red' : '5px solid green',
    padding: 10,
    marginBottom: 10
  }
  if (message === null) {
    return null
  }
  return (
    <div style={notiStyle}>{message}</div>
  )

}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState(null)
  
  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target)
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target)
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchTermChange = (event) => {
    console.log(event.target)
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...existingPerson, number: newNumber}
        personService.update(existingPerson.id, changedPerson)
          .then((updatedPerson) => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person: updatedPerson))
            setMessage(`Updated ${updatedPerson.name}`)
            setIsError(false)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessage(`${changedPerson.name} has been removed from the server`)
            setIsError(true)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      const newPerson = {name: newName, number: newNumber, id: persons.length + 1};
      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${returnedPerson.name}`)
          setIsError(false)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })    
    }
    setNewName('')
    setNewNumber('')
  }
  const personsToShow = searchTerm === '' ? persons: persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
  
  const handleDelete = (id, name) => {
    const confirmed = window.confirm(`Delete ${name}?`)
    if (!confirmed) {
      return
    }
    personService.deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(() => {
        setErrorMsg(`Error deleting ${name}.`)
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000)
      })
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification isError={isError} message={message}/>
      <Filter searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange}/>
      <h3>add a new</h3>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDeleteOf={handleDelete}/>
    </div>
  )
}

export default App;