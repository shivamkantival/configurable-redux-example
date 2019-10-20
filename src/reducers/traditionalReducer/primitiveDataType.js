import { ACTION_TYPES } from "../../config/constants";
import { createActionTypes } from "../../utils";

const { ACTION_TYPE } = createActionTypes(ACTION_TYPES.SET_PRIMITIVE_DATA);
const INITIAL_STATE = "";

export default function(state = INITIAL_STATE, action) {
  const { type, payload = "" } = action;

  let updatedState = state;

  switch (type) {
    case ACTION_TYPE:
      updatedState = payload;
      break;
    default:
      break;
  }

  return updatedState;
}
