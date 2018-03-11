import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class UserList extends React.Component {

  render() {
    const style = {
      textAlign: "center"
    }
    const userList = this.props.users.map(user => (
      <tr key={user.id}>
        <td>
          <Link to={"/users/" + user.id}>{user.name}</Link>
        </td>
        <td>{user.blogs.length}</td>
      </tr>
    ))
    return (
      <table style={style}>
        <thead>
          <tr>
            <td></td>
            <td>Number of blogs</td>
          </tr>
        </thead>
        <tbody>{userList}</tbody>
      </table>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.user.users
  }
}


export default connect(mapStateToProps, null)(UserList);