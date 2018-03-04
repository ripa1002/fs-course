let token = null;

const blogs = [
  {
    id: "5a6c5047c713d7616c2072a4",
    title: "Test blog",
    author: "Administrator",
    likes: 0,
    user: {
      adult: true,
      _id: "5a6c5047c713d7616c2072a2",
      username: "admin",
      name: "Administrator"
    },
    comments: []
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

const setToken = () => {

}

export default { getAll, blogs, setToken };