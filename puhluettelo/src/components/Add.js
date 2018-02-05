import React from 'react'

const Add = ({props}) => {

  return(
    <div>
    <form onSubmit={props.addPerson}>
      <input
        value={props.state.newName}
        onChange={props.handleNameChange}
        placeholder="Nimi"
      />
      <br/>

      <input
        value={props.state.newNumber}
        onChange={props.handleNumberChange}
        placeholder="Numero"
      />
      <br/>
      <br/>
      
      <button type="submit">Lisää</button>
    </form>
  </div>
  )

}

export default Add