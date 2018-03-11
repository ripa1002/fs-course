import React from "react"
import blogService from "./services/blogs"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglabble"
import Success from "./components/Success"
import Error from "./components/Error"
import User from "./components/User"
import UserList from "./components/UserList"
import SingleBlog from "./components/SingleBlog"

import { connect } from "react-redux";
import {addBlog, likeBlog, deleteBlog, initializeBlogs} from "./reducers/BlogReducer"
import {login, logout, initializeUser, initUsers} from "./reducers/UserReducer"

import { Navbar, Button, ListGroup, ListGroupItem } from "react-bootstrap"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      blogTitle: "",
      blogAuthor: "",
      blogUrl: "",
      success: null,
      error: null
    }
  }

  componentDidMount = async () => {
    this.props.initializeBlogs()
    this.props.initUsers()

    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.initializeUser(user)
      blogService.setToken(user.token)
    }
  }

  handleFieldChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  error = msg => {
    this.setState({ error: msg });
    setTimeout(() => this.setState({ error: null }), 5000)
  }

  success = msg => {
    this.setState({ success: msg })
    setTimeout(() => this.setState({ success: null }), 5000)
  }

  login = async e => {
    e.preventDefault()
    this.props.login(this.state.username, this.state.password)
    this.setState({ username: "", password: "" })
  };

  logout = async e => {
    window.localStorage.clear()
    this.props.logout()
    this.setState({ username: "", password: "" })
    this.success("You have logged out.")
  }

  addBlog = async e => {
    e.preventDefault()
    const blogData = {
      author: this.state.blogAuthor,
      title: this.state.blogTitle,
      url: this.state.blogUrl
    }

    this.props.addBlog(blogData)
    this.setState({ blogAuthor: "", blogTitle: "", blogUrl: "" })
    this.success("You added a new blog.")
  };

  filterBlog = blog => {
    return {}
  }

  likeBlog = async id => {
    const blog = this.props.blogs.filter(blog => blog.id === id)[0]
    this.props.likeBlog(blog)
    this.success("You liked a blog.")
  }

  deleteBlog = async id => {
    if (window.confirm("Do you want to delete this blog?")) {
      const blog = this.props.blogs.filter(blog => blog.id === id)[0]
      this.props.deleteBlog(blog)
      this.success("You succesfully deleted a blog.")
    }
  }

  render() {
    const blogs = this.props.blogs
    blogs.sort((blogA, blogB) => {
      return blogB.likes - blogA.likes
    })

    const blogById = id => {
      const blogs = this.props.blogs.filter(blog => blog.id === id)
      return blogs.length > 0 ? blogs[0] : blogs
    }
    
    const userById = id => this.props.users.filter(user => user.id === id)

    if (this.props.user === null) {
      return (
        <div className="container">
          {this.props.loginError && <Error message={this.props.loginError} />}
          {this.props.logoutMessage && (
            <Success message={this.props.logoutMessage} />
          )}
          <LoginForm
            login={this.login}
            username={this.state.username}
            password={this.state.password}
            handleFieldChange={this.handleFieldChange}
          />
        </div>
      )
    } else {
      return (
        <div className="container">
          <Router>
            <div>
              {this.state.error && <Error message={this.state.error} />}
              {this.state.success && <Success message={this.state.success} />}
                <Navbar>
                <Navbar.Text>
                    Welcome back <b>{this.props.user.name}</b>{"  "}
                    <Button bsStyle="danger" onClick={this.logout}>Log out</Button>
                  </Navbar.Text>
                <Togglable buttonLabel="Navigation">
                  <Navbar.Text>
                    <Link to="/">Blogs</Link>
                  </Navbar.Text>
                  <Navbar.Text>
                    <Link to="/users">Users</Link>
                  </Navbar.Text>
                  </Togglable>
                </Navbar>

              <Route exact path="/users" render={() => <UserList />} />
              <Route
                exact
                path="/users/:id"
                render={({ match }) => (
                  <User user={userById(match.params.id)} />
                )}
              />
              <Route
                exact
                path="/blog/:id"
                render={({ match }) => (
                  <SingleBlog
                    blog={blogById(match.params.id)}
                    onClick={() => this.likeBlog(match.params.id)}
                    
                    handleChange={this.handleFieldChange}
                  />
                )}
              />
              <Route
                exact
                path="/"
                render={() => (
                  <div>
                    <h2>Blogs</h2>
                    <ListGroup>
                      {this.props.blogs.map(blog => (
                        <ListGroupItem key={blog.id}><Link to={"/blog/" + blog.id}>{blog.title}</Link>
                          <Blog
                            user={this.props.user.name}
                            likeBlog={this.likeBlog}
                            deleteBlog={this.deleteBlog}
                            blog={blog}
                          />
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </div>
                )}
              />
              <br></br>
              <Togglable buttonLabel="Add new blog">
                <BlogForm
                  onSubmit={this.addBlog}
                  title={this.state.blogTitle}
                  author={this.state.blogAuthor}
                  url={this.state.blogUrl}
                  handleChange={this.handleFieldChange}
                />
              </Togglable>
            </div>
          </Router>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    blogs: state.blogs,
    user: state.user.user,
    users: state.user.users,
    loginEerror: state.user.loginError,
    logoutMessage: state.user.logoutMessage
  };
}

const mapDispatchToProps = {
  addBlog,
  likeBlog,
  deleteBlog,
  initializeBlogs,
  initUsers,
  initializeUser,
  login,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(App);