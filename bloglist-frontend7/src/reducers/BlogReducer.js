import blogService from "./../services/blogs";

const initialState = [];

export const addBlog = blogData => {
  return async dispatch => {
    try {
      const blog = await blogService.create(blogData);

      blog.data.id = blog.data._id;
      delete blog.data._id;
      delete blog.data.__v;
      dispatch({
        type: "ADD_BLOG",
        data: {
          blog: blog.data
        }
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const likeBlog = blog => {
  return async dispatch => {
    try {
      await blogService.update(blog);
      dispatch({
        type: "LIKE_BLOG",
        data: {
          id: blog.id
        }
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteBlog = blog => {
  return async dispatch => {
    try {
      await blogService.remove(blog);
      dispatch({
        type: "DELETE_BLOG",
        data: {
          blog
        }
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    blogs.map(blog => (blog.toggled = false));
    blogs.sort((blogA, blogB) => {
      return blogB.likes - blogA.likes;
    });
    dispatch({
      type: "SET_BLOGS",
      data: {
        blogs
      }
    });
  };
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_BLOG":
      return [...state, action.data.blog];
    case "LIKE_BLOG":
      const old = state.filter(a => a.id !== action.data.id);
      const liked = state.find(a => a.id === action.data.id);
      return [
        ...old,
        {
          ...liked,
          likes: liked.likes + 1
        }
      ];
    case "SET_BLOGS":
      return action.data.blogs;
    case "DELETE_BLOG":
      const blogs = state.filter(blog => blog.id !== action.data.blog.id);
      return blogs;
    case "COMMENT_BLOG":
      const old2 = state.filter(a => a.id !== action.data.id);
      const commented = state.find(a => a.id === action.data.id);
      return [
        ...old2,
        {
          ...commented,
          comments: [...commented.comments, action.data.comment]
        }
      ];
    default:
      return state;
  }
};

export default blogReducer;