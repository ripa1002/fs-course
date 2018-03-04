import * as React from 'react'

class Togglable extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        visible: false
      }
    }
  
    toggleVisibility = () => {
      this.setState({visible: !this.state.visible})
    }
  
    render() {
      const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
      const showWhenVisible = { display: this.state.visible ? '' : 'none' }
  
      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={this.toggleVisibility} className="btn btn-success btn-sm">{this.props.buttonLabel}</button>
          </div>
          <div style={showWhenVisible} className="togglableContent">
            {this.props.children}
            <button onClick={this.toggleVisibility} className="btn btn-danger btn-sm">Cancel</button>
          </div>
        </div>
      )
    }
  }

  export default Togglable;