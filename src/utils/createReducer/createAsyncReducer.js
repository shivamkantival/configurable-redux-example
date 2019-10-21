import _get from "lodash/get";
import createActionTypes from "../createActionTypes";
import { mergeData, wrapWithKey } from "./helpers";

const DEFAULT_INITIAL_STATE = {
  isLoading: false,
  loaded: false,
  hasError: false,
  data: {},
  error: null,
};

function createInitialState(initialState = {}) {
  return {
    ...DEFAULT_INITIAL_STATE,
    ...initialState,
  };
}

function createDefaultAsyncReducer({
  key,
  staticMergeConfig,
  processor,
  initialState,
  SET_FAIL,
  SET_SUCCESS,
  SET_LOADING,
  RESET,
}) {
  return wrapWithKey(function defaultAsyncReducer(
    state = initialState,
    action = {}
  ) {
    const {
      type,
      payload: { data, error, ...rest } = {},
      meta: { merge = staticMergeConfig } = {},
    } = action;

    let updatedState = state;

    switch (type) {
      case SET_LOADING:
        updatedState = {
          ...updatedState,
          isLoading: true,
          loaded: false,
          hasError: false,
          error: null,
        };
        break;
      case SET_SUCCESS:
        updatedState = processor
          ? processor(updatedState, action)
          : {
              ...updatedState,
              isLoading: false,
              loaded: true,
              hasError: false,
              error: null,
              data: merge ? mergeData(_get(updatedState, "data"), data) : data,
              ...rest,
            };
        break;
      case SET_FAIL:
        updatedState = {
          ...updatedState,
          isLoading: false,
          loaded: false,
          hasError: true,
          error,
        };
        break;
      case RESET:
        updatedState = initialState;
        break;
      default:
        break;
    }

    return updatedState;
  },
  key);
}

export default function createAsyncReducer(reducerConfig) {
  const {
    name,
    options: {
      key,
      initialState: stateInitialState,
      merge: staticMergeConfig = true,
      processor,
    } = {},
  } = reducerConfig;
  const initialState = createInitialState(stateInitialState);
  const { SET_SUCCESS, SET_LOADING, SET_FAIL, RESET } = createActionTypes({
    name,
    options: { async: true },
  });

  return createDefaultAsyncReducer({
    key,
    staticMergeConfig,
    processor,
    initialState,
    SET_FAIL,
    SET_SUCCESS,
    SET_LOADING,
    RESET,
  });
}
