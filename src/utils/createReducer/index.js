import _isArray from "lodash/isArray";
import _map from "lodash/map";
import createBaseReducer from "./createBaseReducer";

import { flatCombineReducers, handleInitAndReset } from "./helpers";

function createReducerWithMultipleConfigs(reducersConfig) {
  const reducers = _map(reducersConfig, createBaseReducer);

  return flatCombineReducers(reducers);
}

function createReducer(
  reducerConfig,
  { initialState = {}, resetActionType = "RESET", ...params }
) {
  const hasMultipleReducerConfigs = _isArray(reducerConfig);

  return handleInitAndReset(
    hasMultipleReducerConfigs
      ? createReducerWithMultipleConfigs(reducerConfig, params)
      : createBaseReducer(reducerConfig),
    { initialState, resetActionType }
  );
}

export default createReducer;
