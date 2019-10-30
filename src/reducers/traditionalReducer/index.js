import { combineReducers } from "redux";

// reducers
import normalisedArrayData from "./normalisedArrayData";
import normalisedObjectData from "./normalisedObjectData";
import primitiveDataType from "./primitiveDataType";
import stateWithLoading from "./stateWithLoading";

export default combineReducers({
  normalisedArrayData,
  normalisedObjectData,
  primitiveDataType,
  stateWithLoading,
});
