import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Blog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  handleOpenClose = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    return (
      <div>
        author: {this.props.blog.author} <br></br>
        <button style={{ margin: 5 }} onClick={this.handleOpenClose}>{this.state.visible ? 'Close' : 'Open'}</button>
        {this.state.visible && <div>
          <a href={this.props.blog.url}>{this.props.blog.url}</a> <br></br>
          likes: {this.props.blog.likes} <button onClick={() => this.props.likeBlog(this.props.blog.id)}>like</button> <br></br>
          added by: {this.props.blog.user.name} <br></br>
          <button style={{ margin: 5 }} onClick={() => this.props.deleteBlog(this.props.blog.id)}>delete</button>
        </div>}
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.any.isRequired,
  user: PropTypes.string.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired
}

export default Blog