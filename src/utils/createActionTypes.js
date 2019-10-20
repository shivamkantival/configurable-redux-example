import _isObject from "lodash/isPlainObject";
import { ACTION_TYPE_SUFFIXES } from "../config/constants";

function createAsyncActionTypes(baseActionType) {
  const { SUCCESS, FAIL, RESET } = ACTION_TYPE_SUFFIXES;

  return {
    RESET: `${baseActionType}${RESET}`,
    SET_FAIL: `${baseActionType}${FAIL}`,
    SET_LOADING: baseActionType,
    SET_SUCCESS: `${baseActionType}${SUCCESS}`,
  };
}

function createSyncActionTypes(baseActionType) {
  const { RESET } = ACTION_TYPE_SUFFIXES;

  return {
    ACTION_TYPE: baseActionType,
    RESET: `${baseActionType}${RESET}`,
  };
}

function createActionTypesForObjectLikeConfig(actionConfig) {
  const {
    name,
    options: { async = false },
  } = actionConfig;

  return async ? createAsyncActionTypes(name) : createSyncActionTypes(name);
}

export default function createActionTypes(actionConfig) {
  const isObjectLikeActionConfig = _isObject(actionConfig);

  return isObjectLikeActionConfig
    ? createActionTypesForObjectLikeConfig(actionConfig)
    : createSyncActionTypes(actionConfig);
}
