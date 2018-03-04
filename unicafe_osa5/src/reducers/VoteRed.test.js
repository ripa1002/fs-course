import deepFreeze from "deep-freeze";
import voteReducer from "./VoteRed";

describe("Reducer", () => {
  const initialState = deepFreeze({
    good: 0,
    ok: 0,
    bad: 0
  });

  it("proper state ", () => {
    const state = [];
    let action = {
      type: "GOOD"
    };

    let newState = voteReducer(initialState, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    });

    action = {
      type: "BAD"
    };

    newState = voteReducer(newState, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 1
    });

    action = {
      type: "OK"
    };

    newState = voteReducer(newState, action);
    expect(newState).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    });

    action = {
      type: "BAD"
    };

    newState = voteReducer(newState, action);
    expect(newState).toEqual({
      good: 1,
      ok: 1,
      bad: 2
    });
    
    action = {
      type: "ZERO"
    };

    newState = voteReducer(newState, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    });
  });
});