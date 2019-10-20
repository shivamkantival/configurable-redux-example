// utils
import _get from "lodash/get";
import { createActionTypes } from "../../utils";

// constants
import { ACTION_TYPES } from "../../config/constants";

const { SET_LOADING, SET_FAIL, RESET, SET_SUCCESS } = createActionTypes(
  ACTION_TYPES.SET_STATE_WITH_LOADER
);

const INITIAL_STATE = {
  loading: false,
  loaded: false,
  hasError: false,
  data: {},
};

export default function(state = INITIAL_STATE, action) {
  const { type, payload = INITIAL_STATE, meta: { merge = true } = {} } = action;
  const { data = {}, ...restPayload } = payload;

  let updatedState = state;

  switch (type) {
    case SET_LOADING:
      updatedState = {
        ...updatedState,
        loading: true,
        loaded: false,
        hasError: false,
      };
      break;
    case SET_SUCCESS:
      updatedState = {
        ...updatedState,
        loading: false,
        loaded: true,
        hasError: false,
        data: merge
          ? {
              ...(_get(updatedState, "data") || {}),
              ...data,
            }
          : data,
        ...restPayload,
      };
      break;
    case SET_FAIL:
      updatedState = {
        ...updatedState,
        loaded: false,
        loading: false,
        hasError: true,
        error: payload,
      };
      break;
    case RESET:
      updatedState = INITIAL_STATE;
      break;
    default:
      break;
  }

  return updatedState;
}
