import { Dispatch, AnyAction } from 'redux';
import { UPDATE_CONFIG, SET_CONFIG_SCHEMA } from './index';

export const updateConfig = (config: {}) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  dispatch({
    type: UPDATE_CONFIG,
    payload: config
  });
}

export const setConfigSchema = (configSchema: {}) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  dispatch({
    type: SET_CONFIG_SCHEMA,
    payload: configSchema
  });
}
