import React from 'react'

const Search = ({props}) => {
  return(
    <div>
      <h2>Etsi</h2>
      <form onSubmit={props.showAll}>
        <input value={props.state.filter} onChange={props.handleFilterChange} placeholder='Etsi nimellä'/>
          <button type='submit' hidden='hidden'>piilo</button>
      </form>
  </div>
  )
}

export default Search