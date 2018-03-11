import loginService from "./../services/login";
import userService from "./../services/users";

const initialState = {
  user: null,
  loginError: null,
  logoutMessage: null,
  users: []
};

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: "LOGOUT",
      data: {
        message: "Logged out."
      }
    });
  };
};

export const login = (username, password) => {
  return async dispatch => {
    try {
      const res = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(res));
      dispatch({
        type: "LOGIN",
        data: {
          user: res
        }
      });
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILED",
        data: {
          message: "Invalid username or password"
        }
      });
    }
  };
};

export const initializeUser = user => {
  return {
    type: "INITIALIZE_USER",
    data: {
      user
    }
  };
};

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.getAll();
    dispatch({
      type: "SET_USERS",
      data: {
        users
      }
    });
  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return Object.assign({}, state, { user: action.data.user });
    case "LOGIN_FAILED":
      return Object.assign({}, state, { loginError: action.data.message });
    case "LOGOUT":
      return Object.assign({}, state, {
        user: null,
        logoutMessage: action.data.message
      });
    case "INITIALIZE_USER":
      return Object.assign({}, state, {
        user: action.data.user
      });
    case "SET_USERS":
      return Object.assign({}, state, { users: action.data.users });
    default:
      return state;
  }
};

export default userReducer;