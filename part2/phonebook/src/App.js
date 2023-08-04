import { useEffect, useState } from 'react'
import axios from 'axios'
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

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map(person => <Person key={person.id} person={person}/>)}
    </div>
  
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons')
      .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
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
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber, id: persons.length + 1}))
    }
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = searchTerm === '' ? persons: persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
  
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange}/>
      <h3>add a new</h3>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App;
