import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import countryService from './services/countries'
import Countries from './components/Countries';
import Filter from './components/Filter';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().indexOf(filterText) > -1)

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value)
  }

  return (
    <div>
      <h3>Filter Country by Name</h3>
      <Filter filterValue={filterText} onFilterTextChange={handleFilterTextChange} />
      <Countries countries={filteredCountries} />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))