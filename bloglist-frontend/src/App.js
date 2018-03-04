import React from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglabble'
import Success from './components/Success'
import Error from './components/Error'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      blogTitle: '',
      blogAuthor: '',
      blogUrl: '',
      user: null,
      success: null,
      error: null
    }
  }

  componentDidMount = async () => {
    const blogs = await blogService.getAll();
    blogs.map(blog => blog.toggled = false)
    blogs.sort((blogA, blogB) => {
      return blogB.likes - blogA.likes;
    })

    this.setState({ blogs })

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  error = (message) => {
    this.setState({ error: message })
    setTimeout(() => this.setState({ error: null }), 3000);
  }

  success = (message) => {
    this.setState({ success: message })
    setTimeout(() => this.setState({ success: null }), 5000);
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      this.setState({ username: '', password: '', user })
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      this.success(user.name + ' logged in.');
    } catch (exception) {
      this.error(exception.response.data.error || 'Login error');
    }
  }

  logout = async (event) => {
    window.localStorage.clear();
    this.setState({ user: null, username: '', password: '' })
    this.success('logged out.');
  }

  addBlog = async (event) => {
    const blogContents = {
      author: this.state.blogAuthor,
      title: this.state.blogTitle,
      url: this.state.blogUrl
    };

    try {
      const blog = await blogService.create(blogContents);

      blog.data.id = blog.data._id;
      delete blog.data._id;
      delete blog.data.__v;

      const blogs = this.state.blogs.concat(blog.data);
      this.setState({ blogs });
      this.setState({ blogAuthor: '', blogTitle: '', blogUrl: '' })
      this.success('Blog added.');
    } catch (error) {
      this.error(error.response.data.error || 'adding blog error')
    }
  }

  likeBlog = async (id) => {
    try {
      const blog = this.state.blogs.filter(blog => blog.id === id)[0];
      blog.likes = blog.likes + 1;

      await blogService.update(blog);

      this.success('Blog liked');
    } catch (err) {
      this.error('liking blog error');
    }
  }

  deleteBlog = async (id) => {
    if (window.confirm('delete this blog?')) {
      try {
        const blog = this.state.blogs.filter(blog => blog.id === id)[0];

        await blogService.remove(blog);

        this.success('Blog deleted');
        const blogs = this.state.blogs.filter(blog => blog.id !== id);
        this.setState({ blogs });
      } catch (err) {
        console.error(err);
        this.error('deleting blog error');
      }
    }
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      paddingBottom: 10,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    if (this.state.user === null) {
      return (
        <div>
          {this.state.error && <Error message={this.state.error} />}
          {this.state.success && <Success message={this.state.success} />}
          <LoginForm login={this.login} username={this.state.username} password={this.state.password} handleFieldChange={this.handleFieldChange} />
        </div>
      )
    } else {
      return (
        <div>
          {this.state.error && <Error message={this.state.error} />}
          {this.state.success && <Success message={this.state.success} />}
          <p>
            Welcome back {this.state.user.name}! <button className="btn btn-danger btn-smr" onClick={this.logout}>Log out</button>
          </p>
          <h2>Blogs</h2>
          <div style={blogStyle}>
            {this.state.blogs.map(blog =>
              <Blog key={blog.id} user={this.state.user.name} likeBlog={this.likeBlog} deleteBlog={this.deleteBlog} blog={blog} />
            )}
          </div>
          <Togglable buttonLabel="Add new blog">
            <BlogForm onSubmit={this.addBlog} title={this.state.blogTitle} author={this.state.blogAuthor} url={this.state.blogUrl} handleChange={this.handleFieldChange} />
          </Togglable>
        </div>
      );
    }

  }
}

export default App;