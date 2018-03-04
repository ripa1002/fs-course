const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  };
  
  export const addGood = () => {
    return {
      type: "GOOD"
    };
  };
  
  export const addOk = () => {
    return {
      type: "OK"
    };
  };
  
  export const addBad = () => {
    return {
      type: "BAD"
    };
  };
  
  export const setZero = () => {
    return {
      type: "ZERO"
    };
  };
  
  const voteReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GOOD":
        return Object.assign({}, state, { good: state.good + 1 });
      case "OK":
        return Object.assign({}, state, { ok: state.ok + 1 });
      case "BAD":
        return Object.assign({}, state, { bad: state.bad + 1 });
      case "ZERO":
        return Object.assign({}, state, { good: 0, ok: 0, bad: 0 });
      default:
        return state;
    }
  };
  
  export default voteReducer;