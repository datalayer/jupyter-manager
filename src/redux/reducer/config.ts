import { configInitialState, ConfigState } from "./../state/config"
import {
  UPDATE_CONFIG,
  SET_CONFIG_SCHEMA,
} from './../actions';

function configReducer(
  state: ConfigState = configInitialState,
  action: {
    type: string;
    payload: any;
  }
): ConfigState {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_CONFIG:
      return {
        ...state,
        config: payload,
      };
    case SET_CONFIG_SCHEMA:
      return {
        ...state,
        config_schema: payload,
      };
    default:
      return state;
  }
}

export default configReducer;
