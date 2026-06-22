import { useState, useEffect } from 'react'
import CountryDetails from './components/CountryDetails'
import CountryList from './components/CountryList'
import axios from 'axios'
import countryService from './services/countries'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {


  const [allCountries, setAllCountries] = useState([])
  const [country, setCountry] = useState({})
  const [countryFound, setCountryFound] = useState(false)
  const [filterCountries, setFilterCountries] = useState([])
  const [countryList, setCountryList] = useState(false)
  const [tooManyCountries, setTooManyCountries] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    countryService.getAll().then(initialData => {

      setAllCountries(initialData)

    })
  }, [])

  const handleOnChange = (event) => {
    if (event.target.value == '') {
      setCountryFound(false)
      setCountryList(false)
      setTooManyCountries(false)
      setMessage('')
      setCountry({})
      setFilterCountries([])
    } else {
      console.log(event.target.value);
      countryService.getByName(event.target.value).then(dataByName => {
        setCountry(dataByName)
        console.log(dataByName)
        console.log(country);
        setCountryFound(true)
        setCountryList(false)
        setMessage('')
        setTooManyCountries(false)
      }).catch(err => {
        console.log(err.status);
        if (err.status === 404 && event.target.value != '') {
          let filteredCountries = []
          console.log('find in all data');
          filteredCountries = allCountries.filter(ele => ele.name.common.toLowerCase().includes(event.target.value))
          console.log(filteredCountries);
          if (filteredCountries.length > 10) {
            setMessage('Too many matches, specify another filter')
            setTooManyCountries(true)
            setCountryFound(false)
            setCountryList(false)
            setCountry({})
            setFilterCountries([])
          } else if (filteredCountries.length > 1 && filteredCountries.length < 10) {
            setFilterCountries(filteredCountries)
            setCountryList(true)
            setCountryFound(false)
            setCountry({})
            setMessage('')
            setTooManyCountries(false)
          } else if (filteredCountries.length === 1) {
            setCountry(filteredCountries[0])
            console.log(filteredCountries[0]);
            setCountryFound(true)
            setCountryList(false)
            setMessage('')
            setTooManyCountries(false)
          }
        }

      })
    }
  }

  const handleOnShowClick = (event) => {
    console.log(event.target.id);
    const showCountry = filterCountries[event.target.id]
    console.log(showCountry);
    setCountry(showCountry)
    setCountryFound(true)
    setCountryList(false)
  }



  return (
    <div>
      <form>
        Find countries <input placeholder='Search' name='search' onChange={handleOnChange} />
      </form>
      {countryFound && <CountryDetails country={country} />}
      {countryList && <CountryList countryList={filterCountries} onClick={handleOnShowClick} />}
      {tooManyCountries && <div>{message}</div>}
    </div>
  )
}

export default App 