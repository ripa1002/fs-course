import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class User extends Component {

  render() {
    const user = this.props.user;
    let blogs = [];
    if (user.length > 0) {
      if (this.props.user[0].blogs !== undefined) {
        blogs = this.props.user[0].blogs;
      }
    }
    return (
      <div>
        <h1>
          Blogs added by {user.length > 0 ? this.props.user[0].name : null}
        </h1>
        <ul>
          {blogs.map(blog => (
            <li key={blog._id}>
              <Link to={"/blog/" + blog._id}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect()(User);