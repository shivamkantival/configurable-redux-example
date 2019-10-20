import createActionTypes from "../createActionTypes";
import createAsyncReducer from "./createAsyncReducer";

export default function createBaseReducer(reducerConfig) {
  const { options: { async = false } = {} } = reducerConfig;

  return async
    ? createAsyncReducer(reducerConfig)
    : createSyncReducer(reducerConfig);
}
