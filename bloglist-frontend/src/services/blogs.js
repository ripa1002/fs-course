import axios from 'axios'
const baseUrl = '/api/blogs'

let token = '';

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  const request = axios.post(baseUrl, blog, config)

  return request;
}

const update = (blog) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  const request = axios.put(baseUrl + '/' + blog.id, blog, config)

  return request;
}

const remove = (blog) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  const request = axios.delete(baseUrl + '/' + blog.id, config)

  return request;
}

const setToken = (authToken) => {
  token = authToken;
  
}

export default {
  getAll,
  create,
  setToken,
  update,
  remove
}