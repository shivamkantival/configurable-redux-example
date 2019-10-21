/* eslint-disable no-debugger */
import { createActionTypes, createReducer } from "../../../utils";
import { ACTION_TYPES } from "../../../config/constants";

const ACTION_TYPE = ACTION_TYPES.SET_NORMALISED_ARRAY_DATA;

const reducerWithArrayLikeData = createReducer({
  name: ACTION_TYPE,
  options: {
    initialState: [],
  },
});

/* eslint no-unused-vars:0 */
let state;
debugger;

state = reducerWithArrayLikeData(state, { type: "randomAction" });
debugger;

// set data
state = reducerWithArrayLikeData(state, {
  type: ACTION_TYPE,
  payload: ["a", "b", "c"],
});
debugger;

// merge data
state = reducerWithArrayLikeData(state, {
  type: ACTION_TYPE,
  payload: ["d", "e", "f"],
});
debugger;

// replace state
state = reducerWithArrayLikeData(state, {
  type: ACTION_TYPE,
  payload: ["g", "h"],
  meta: {
    merge: false,
  },
});
debugger;

// reset
state = reducerWithArrayLikeData(state, {
  type: createActionTypes(ACTION_TYPE).RESET,
});
debugger;
