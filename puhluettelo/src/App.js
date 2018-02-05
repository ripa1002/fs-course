import React from 'react'
import Puhelinluettelo from './components/Puhelinluettelo'
import Alert from './components/Alert'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  render() {

    return (
      <div>
        <Puhelinluettelo/>
        <Alert message={this.state.error}/>

      </div>
    )
  }
}

export default App