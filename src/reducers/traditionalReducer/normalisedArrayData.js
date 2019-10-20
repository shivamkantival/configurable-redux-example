import { ACTION_TYPES } from "../../config/constants";
import { createActionTypes } from "../../utils";

const { ACTION_TYPE } = createActionTypes(
  ACTION_TYPES.SET_NORMALISED_ARRAY_DATA
);
const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  const {
    type,
    payload = [],
    meta: { merge = true },
  } = action;

  let updatedState = state;

  switch (type) {
    case ACTION_TYPE:
      updatedState = merge ? [...updatedState, ...payload] : INITIAL_STATE;
      break;
    default:
      break;
  }

  return updatedState;
}
