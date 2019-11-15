import _isString from "lodash/isString";
import createSyncReducer from "./createSyncReducer";
import createAsyncReducer from "./createAsyncReducer";

function createReducerWithObjectLikeConfig(reducerConfig) {
  const { options: { async = false } = {} } = reducerConfig;

  return async
    ? createAsyncReducer(reducerConfig)
    : createSyncReducer(reducerConfig);
}

export default function createBaseReducer(reducerConfig) {
  return _isString(reducerConfig)
    ? createSyncReducer({ name: reducerConfig })
    : createReducerWithObjectLikeConfig(reducerConfig);
}
