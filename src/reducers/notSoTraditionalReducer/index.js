import { createReducer } from "../../utils";
import { ACTION_TYPES } from "../../config/constants";

export default createReducer(
  [
    // normalisedArrayData
    {
      name: ACTION_TYPES.SET_NORMALISED_ARRAY_DATA,
      options: {
        key: "normalisedArrayData",
      },
    },

    // normalisedObjectData
    {
      name: ACTION_TYPES.SET_NORMALISED_OBJECT_DATA,
      options: {
        key: "normalisedObjectData",
      },
    },

    // primitiveDataType
    {
      name: ACTION_TYPES.SET_PRIMITIVE_DATA,
      options: {
        key: "primitiveDataType",
      },
    },

    // stateWithLoadingState
    {
      name: ACTION_TYPES.SET_PRIMITIVE_DATA,
      options: {
        key: "stateWithLoadingState",
        async: true,
      },
    },
  ],
  {
    resetActionType: "@@namespace/RESET",
    initialState: {
      normalisedArrayData: [],
      normalisedObjectData: {},
      primitiveDataType: 0,
      stateWithLoadingState: {},
    },
  }
);
