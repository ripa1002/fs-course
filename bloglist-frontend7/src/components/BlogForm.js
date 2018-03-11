import * as React from 'react'

const BlogForm = ({ onSubmit, handleChange, title, author, url }) => {
    return (
        <div>
            <h2>Create a new blog</h2>
            <form onSubmit={onSubmit}>
                <p>
                    Title <input
                        name="blogTitle"
                        value={title}
                        onChange={handleChange}
                    />
                </p>
                <p>
                    Author <input
                        name="blogAuthor"
                        value={author}
                        onChange={handleChange}
                    />
                </p>
                <p>
                    URL <input
                        name="blogUrl"
                        value={url}
                        onChange={handleChange}
                    /></p>
                <p>
                    <button className="btn btn-success">Save</button>
                </p>
            </form>
        </div>
    )
}

export default BlogForm