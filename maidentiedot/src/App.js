import React from 'react'
import axios from 'axios'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
      this.setState({
        countries: response.data
      })
    })
  }

  handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value
    })
  }

  handleClickName = (name) => {
    return () => {
      this.setState({
        filter: name
      })
    }
  }

  render() {
    return (
      <div>
        <ShowSearch countries={this.state.countries} filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
        <ShowCountries countries={this.state.countries.filter(maat => maat.name.toLowerCase().includes(this.state.filter.toLowerCase()))} handleClickName={this.handleClickName} />
      </div>
    )
  }
}

const ShowSearch = ({countries, filter, handleFilterChange}) => {
  return (
    <form>
      <input value={filter} onChange={handleFilterChange}/>
    </form>
  )
}

const ShowCountries = ({countries, handleClickName}) => {
 if (countries.length === 1) {
  return (
    <div>
      <ShowCountry country={countries[0]} />
    </div>
  )
} else if (countries.length > 0) {
    return (
      <div>
        {countries.map(maa => <div key={maa.name} onClick={handleClickName(maa.name)}>{maa.name}</div>)}
      </div>
    )
}
  return (
    <div></div>
  )
}

const ShowCountry = ({country}) => {
  return (
    <div>
      <h1>Name: {country.name}</h1>
      <div>Capital: {country.capital} </div>
      <div>Population: {country.population} </div>
      <div> <img src={country.flag} alt={country.name} width={450} height={300}/> </div>
    </div>
  )
}

export default App
