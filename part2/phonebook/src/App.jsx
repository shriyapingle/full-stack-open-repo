import { useState } from 'react'
import Headings from './components/Headings';
import Display from './components/Display';
import Search from './components/Search';
import AddNewContact from './components/AddNewContact';


const App = () => {
  let personsList = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]
  const [persons, setPersons] = useState(personsList)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchOn, setSearchOn] = useState(false)
  const [searchList, setSearchList] = useState([])
  const [noRecord, setNoRecord] = useState(false)

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmitNewName = (event) => {
    setSearchOn(false)
    setNoRecord(false)
    event.preventDefault()
    if (persons.find(person => person.name.toLowerCase() == newName.toLowerCase())) {
      return (alert(`${newName} is already added to phonebook`))
    }
    const newPersons = [...persons]
    const newPerson = { name: newName, number: newNumber, id: newPersons.length + 1 }
    newPersons.push(newPerson)
    setPersons(newPersons)

    setNewName('')
    setNewNumber('')
  }

  const searchName = (event) => {
    setSearchOn(true)
    const arr = [...persons]
    const filterList = arr.filter(ele => ele.name.toLowerCase().replace(/\s/g, '').match(event.target.value))
    if (filterList.length === 0) {
      setNoRecord(true)
    } else {
      setNoRecord(false)
    }
    setSearchList(filterList)
  }

  return (
    <div>
      <Headings htype='h2' props="Phonebook" />
      <Search onChange={searchName} />
      <Headings htype='h2' props="Add New" />
      <AddNewContact onSubmit={handleSubmitNewName} nameValue={newName} numberValue={newNumber} onNameChange={handleNewNameChange} onNumberChange={handleNewNumberChange} />
      <Headings htype='h2' props="Numbers" />
      {!searchOn && <Display props={persons} />}
      {searchOn && <Display props={searchList} />}
      {searchOn && noRecord && <Headings htype='div' props="No record found." />}
    </div>

  )
}

export default App