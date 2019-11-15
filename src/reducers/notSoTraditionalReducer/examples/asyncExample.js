/* eslint-disable no-debugger */
import { createActionTypes, createReducer } from "../../../utils";
import { ACTION_TYPES } from "../../../config/constants";

const reducerWithAsyncState = createReducer({
  name: ACTION_TYPES.SET_STATE_WITH_LOADER,
  options: {
    initialState: {
      data: [],
    },
    async: true,
  },
});

const { SET_LOADING, SET_FAIL, SET_SUCCESS, RESET } = createActionTypes({
  name: ACTION_TYPES.SET_STATE_WITH_LOADER,
  options: {
    async: true,
  },
});

// eslint-disable-next-line no-unused-vars
let state;
debugger;

state = reducerWithAsyncState(state, {
  type: "RANDOM_ACTION",
});
debugger;

// start loading data
state = reducerWithAsyncState(state, {
  type: SET_LOADING,
});
debugger;

state = reducerWithAsyncState(state, {
  type: SET_SUCCESS,
  payload: {
    data: ["a", "b", "c"],
    yo: "yo",
  },
});
debugger;

// filters changed
state = reducerWithAsyncState(state, {
  type: SET_LOADING,
});
debugger;

state = reducerWithAsyncState(state, {
  type: SET_SUCCESS,
  payload: {
    data: ["d", "e", "f"],
  },
  meta: { merge: false },
});
debugger;

// fetch failure
state = reducerWithAsyncState(state, {
  type: SET_LOADING,
});
debugger;

state = reducerWithAsyncState(state, {
  type: SET_FAIL,
  payload: {
    error: new Error("random Error"),
  },
});
debugger;

// to reset state
state = reducerWithAsyncState(state, {
  type: RESET,
});
debugger;
