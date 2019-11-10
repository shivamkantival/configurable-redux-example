import _isObject from "lodash/isPlainObject";
import createActionTypes from "./createActionTypes";

function createBaseActionCreator(actionType) {
  return function defaultActionCreator(payload, meta) {
    return {
      type: actionType,
      payload,
      meta,
    };
  };
}

function createActionCreatorsForAsyncActionType(actionType) {
  const { SET_FAIL, SET_LOADING, RESET, SET_SUCCESS } = createActionTypes({
    name: actionType,
    options: { async: true },
  });

  return {
    RESET: createBaseActionCreator(RESET),
    SET_FAIL: createBaseActionCreator(SET_FAIL),
    SET_LOADING: createBaseActionCreator(SET_LOADING),
    SET_SUCCESS: createBaseActionCreator(SET_SUCCESS),
  };
}

function createActionCreatorsForSyncActionType(actionType) {
  const { ACTION_TYPE, RESET } = createActionTypes(actionType);

  return {
    RESET: createBaseActionCreator(RESET),
    ACTION_TYPE: createBaseActionCreator(ACTION_TYPE),
  };
}

function createActionCreatorsForObjectLikeConfig(objectLikeActionConfig) {
  const {
    name,
    options: { async = false },
  } = objectLikeActionConfig;

  return async
    ? createActionCreatorsForAsyncActionType(name)
    : createActionCreatorsForSyncActionType(name);
}

export default function createActionCreators(actionConfig) {
  const isObjectLikeConfig = _isObject(actionConfig);

  return isObjectLikeConfig
    ? createActionCreatorsForObjectLikeConfig(actionConfig)
    : createActionCreatorsForSyncActionType(actionConfig);
}
