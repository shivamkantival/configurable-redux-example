import _isArray from "lodash/isArray";
import _isObject from "lodash/isPlainObject";
import _isObjectLike from "lodash/isObjectLike";
import _find from "lodash/find";
import _noop from "lodash/noop";
import _map from "lodash/map";

const DATA_TYPES = {
  ARRAY: "ARRAY",
  OBJECT: "OBJECT",
  NON_OBJECT_VALUES: "NON_OBJECT_VALUES",
};
const DATA_TYPE_TO_TYPE_CHECKER = {
  [DATA_TYPES.ARRAY]: _isArray,
  [DATA_TYPES.OBJECT]: _isObject,
  [DATA_TYPES.NON_OBJECT_VALUES]: valueToCheck => !_isObjectLike(valueToCheck),
};
const ORDER_OF_DATA_TYPE_CHECKS = [
  DATA_TYPES.ARRAY,
  DATA_TYPES.OBJECT,
  DATA_TYPES.NON_OBJECT_VALUES,
];
const DATA_TYPE_TO_DATA_MERGER = {
  [DATA_TYPES.ARRAY]: (oldData, newData) => [...oldData, ...newData],
  [DATA_TYPES.OBJECT]: (oldData, newData) => ({ ...oldData, ...newData }),
  [DATA_TYPES.NON_OBJECT_VALUES]: (_, newData) => newData,
};

function getDataType(valueToCheck) {
  return _find(ORDER_OF_DATA_TYPE_CHECKS, dataType =>
    (DATA_TYPE_TO_TYPE_CHECKER[dataType] || _noop)(valueToCheck)
  );
}

export function mergeData(originalData, newData) {
  const originalDataType = getDataType(originalData);
  const newDataType = getDataType(newData);

  if (originalDataType !== newDataType) {
    throw new Error("Data types to merge are not compatible");
  }
  return (DATA_TYPE_TO_DATA_MERGER[originalDataType] || _noop)(
    originalData,
    newData
  );
}

export function wrapWithKey(baseReducer, key) {
  // eslint-disable-next-line no-param-reassign
  baseReducer.key = key;

  return baseReducer;
}

function wrapWithInitAndResetReducer(
  baseReducer,
  { initialState, resetActionType }
) {
  return function withInitAndResetHandler(state = initialState, action) {
    return action.type === resetActionType
      ? initialState
      : baseReducer(state, action);
  };
}

export function handleInitAndReset(
  baseReducer,
  { initialState, resetActionType }
) {
  return initialState && resetActionType
    ? wrapWithInitAndResetReducer(baseReducer, {
        initialState,
        resetActionType,
      })
    : baseReducer;
}

export function flatCombineReducers(reducers) {
  return function combinedReducer(state = {}, action) {
    let hasChanged = false;
    let updatedState = {};

    _map(reducers, reducer => {
      const { key } = reducer;

      if (key) {
        const oldKeyedState = state[key];
        const newKeyedState = reducer(oldKeyedState, action);

        updatedState[key] = newKeyedState;
        hasChanged = hasChanged || newKeyedState !== oldKeyedState;
      } else {
        const updatedNonKeyedState = reducer(state, action);

        updatedState = {
          ...updatedState,
          ...updatedNonKeyedState,
        };
        hasChanged = hasChanged || state !== updatedNonKeyedState;
      }
    });

    return hasChanged ? updatedState : state;
  };
}
