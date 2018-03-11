import * as React from "react"

const SingleBlog = ({ blog, onClick, onSubmit, handleChange}) => {
  return (
    <div>
      <div className="title-author">
        <h1>{blog.title}</h1>
        <h2>{blog.author}</h2>
      </div>
      <div className="likes">
        blog has {blog.likes} likes {"    "}
        <button className="btn btn-primary" onClick={onClick}>like</button>
      </div>
      
    </div>
  )
}

export default SingleBlog