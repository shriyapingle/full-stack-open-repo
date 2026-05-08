import { useState, useEffect } from 'react';
import Headings from './components/Headings';
import Display from './components/Display';
import Search from './components/search';
import AddNewContact from './components/AddNewContact';
import axios from 'axios'
import phoneBookService from './services/phoneBook';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchOn, setSearchOn] = useState(false)
  const [searchList, setSearchList] = useState([])
  const [noRecord, setNoRecord] = useState(false)

  useEffect(() => {
    phoneBookService.getAll().then(intialContacts => {
      setPersons(intialContacts)
    })
  }, [])

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const clear = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleSubmitNewName = (event) => {
    setSearchOn(false)
    setNoRecord(false)
    event.preventDefault()

    if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase() && person.number.replace(/-/g,'') !== newNumber.replace(/-/g,''))) {
      // clear()
      if (window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')) {
        const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        const newObject = { ...existingPerson, number: newNumber }

        phoneBookService.update(existingPerson.id, newObject).then(response => {
          setPersons(persons.map(person => person.id === existingPerson.id ? response.data : person))
          clear()
        }).catch(err => console.log(err))
      } else {
        clear()
      }
    } else if ((persons.find(person => person.number.replace(/-/g, '') === newNumber.replace(/-/g, ''))) || (persons.find(person => person.name.toLowerCase() === newName.toLowerCase()) && persons.find(person => person.number.replace(/-/g,'') === newNumber.replace(/-/g,'')))) {
      clear()
      return (alert(`${newName} and/or ${newNumber} is already added to phonebook`))

    }else {
      const newPersons = [...persons]
      const newPerson = { name: newName, number: newNumber, id: newPersons.length + 1 }

      phoneBookService.create(newPerson).then(response => {
        if (response.status === 201) {
          setPersons(persons.concat(response.data))
          clear()
        }
      }).catch(err => console.log(err))
    }
  }

  const onDelete = (event) => {
    
    const name = (persons.filter(contact => contact.id === event.target.id))[0].name
    
    if (window.confirm('Do you want to delete ' + name + '?')) {
      phoneBookService.remove(event.target.id).then(response => {
        setPersons(persons.filter(person => person.name.toLowerCase() !== name.toLowerCase()))
      }).catch(err => console.log(err))
    } else {
      console.log('cancel');
    }


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
      {!searchOn && <Display props={persons} onClick={onDelete} />}
      {searchOn && <Display props={searchList} onClick={onDelete} />}
      {searchOn && noRecord && <Headings htype='div' props="No record found." />}
    </div>

  )
}

export default App