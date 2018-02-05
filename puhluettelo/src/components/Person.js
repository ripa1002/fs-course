import React from 'react'

const Person = ({ person, onClickDelete }) => {
  return (
    <li>{person.name} : {person.number} <button onClick={() => {if(window.confirm('Haluatko varmasti poistaa?')) {onClickDelete()}}}>Poista</button></li>
  )
}

export default Person