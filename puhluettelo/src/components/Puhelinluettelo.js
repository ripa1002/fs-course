import React from 'react'
import Person from './Person'
import Add from './Add'
import Search from './Search'
import Alert from './Alert'
import personService from '../services/persons'

class Puhelinluettelo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: null
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  handleNameChange = (name) => {
    this.setState({
      newName: name.target.value
     })
  }

  handleNumberChange = (number) => {
    this.setState({
      newNumber: number.target.value
     })
  }

  handleFilterChange = (string) => {
    this.setState({
      filter: string.target.value,
      showAll: false
    })
  }

  onClickUpdate = (id) => {
    const person = this.state.persons.find(p => p.id === id)
    const changedPerson = { ...person, number: this.state.newNumber }

    personService
      .update(id, changedPerson)
      .then(newPerson => {
        this.setState({
          persons: this.state.persons.map(person => person.id !== id ? person : changedPerson),
          newName:'',
          newNumber:'',
          message: `${newPerson.name}:n numero päivitetty.`
        })
      }
    )
    .catch(error => {
      this.setState({
        message: `Henkilö '${person.name}' on poistettu.`,
        persons: this.state.persons.filter(n => n.id !== id)
      })
    })

    setTimeout(() => {
      this.setState({message: null})
    }, 5000)
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    const names = this.state.persons.map((person) =>  person.name)

    if(names.includes(personObject.name)) {
      const person = this.state.persons.find(p => p.name === personObject.name)
      if(window.confirm('haluatko päivittää luettelon?')) {this.onClickUpdate(person.id)}
    } else {
      personService
        .create(personObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName:'',
            newNumber:'',
            message: `${newPerson.name} lisätty.`
          })
        })

        setTimeout(() => {
          this.setState({message: null})
        }, 5000)
    }
  }

  onClickDelete = (id) => {
    return () => {
      personService
        .deleteId(id)
        .then(person => {
          const persons = this.state.persons.filter(p => p.id !== id)
          this.setState({
            persons: persons,
            message: `Henkilö poistettu.`
          })
        })

        setTimeout(() => {
          this.setState({message: null})
        }, 5000)
    }
  }

  render() {
    let personList = []
    personList=this.state.persons.filter(person => {
          return(
            person.name.toUpperCase().includes(this.state.filter.toUpperCase())
          )
        })

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Alert message={this.state.message}/>
        <Search props={this}/>
        <br/>
        
        <Add props={this}/>
        <h2>Numerot</h2>
        {personList.map(henkilo => <Person key={henkilo.id} person={henkilo} onClickDelete={this.onClickDelete(henkilo.id)}/>)}
      </div>
    )
  }
}

export default Puhelinluettelo