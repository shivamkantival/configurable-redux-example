import { mergeData, wrapWithKey } from "./helpers";
import createActionTypes from "../createActionTypes";

function createBaseSyncReducer({
  ACTION_TYPE,
  RESET,
  initialState,
  staticMergeConfig,
  processor,
  key,
}) {
  return wrapWithKey(function baseSyncReducer(state = initialState, action) {
    const { type, payload, meta: { merge = staticMergeConfig } = {} } = action;
    let updatedState = state;

    switch (type) {
      case ACTION_TYPE:
        // eslint-disable-next-line no-nested-ternary
        updatedState = processor
          ? processor(updatedState, action)
          : merge
          ? mergeData(updatedState, payload)
          : payload;
        break;
      case RESET:
        updatedState = initialState;
        break;
      default:
        break;
    }

    return updatedState;
  }, key);
}

export default function createSyncReducer(reducerConfig) {
  const {
    name,
    options: {
      processor,
      merge: staticMergeConfig = true,
      key,
      initialState = {},
    } = {},
  } = reducerConfig;
  const { ACTION_TYPE, RESET } = createActionTypes(name);

  return createBaseSyncReducer({
    ACTION_TYPE,
    RESET,
    initialState,
    staticMergeConfig,
    processor,
    key,
  });
}
