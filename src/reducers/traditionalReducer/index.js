import { combineReducers } from "redux";

// reducers
import normalisedArrayData from "./normalisedArrayData";
import normalisedObjectData from "./normalisedObjectData";
import primitiveDataType from "./primitiveDataType";
import stateWithLoadingState from "./stateWithLoadingState";

export default combineReducers({
  normalisedArrayData,
  normalisedObjectData,
  primitiveDataType,
  stateWithLoadingState,
});
