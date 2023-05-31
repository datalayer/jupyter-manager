import { Dispatch, AnyAction } from 'redux';
import jupyterHubApi from '../../api/jupyterHubAPI';
import {
  USER_PAGINATION,
  SET_USER_OFFSET,
  SET_NAME_FILTER,
  REFRESH_USERS,
  START_SERVER,
  STOP_SERVER,
  START_ALL_SERVERS,
  STOP_ALL_SERVERS,
  ADD_USERS,
  EDIT_USER,
  DELETE_USER,
  GET_USER,
  USER_ERROR,
  USER_ERROR_CLEAR,
  USER_SUCCESS_CLEAR,
  SHUTDOWN_HUB
} from './index';

export const setUserOffset = (offset: number) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    dispatch({
      type: SET_USER_OFFSET,
      payload: offset
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err }
    });
  }
};

export const setNameFilter = (namefilter: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    dispatch({
      type: SET_NAME_FILTER,
      payload: namefilter
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err }
    });
  }
};

export const getCurrentUser = (username: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const payload = await jupyterHubApi.getUser(username);
    dispatch({
      type: GET_USER,
      payload
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const getUsersPagination = (
  offset: number,
  limit: number,
  name_filter: string
) => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
  try {
    const payload = await jupyterHubApi.getUsers(offset, limit, name_filter);
    dispatch({
      type: USER_PAGINATION,
      payload
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const addUsers = (usernames: string[], admin: boolean) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    await jupyterHubApi.addUsers(usernames, admin);
    dispatch({
      type: ADD_USERS
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const deleteUser = (username: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    await jupyterHubApi.deleteUser(username);
    dispatch({
      type: DELETE_USER
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const editUser = (
  username: string,
  updated_username: string,
  admin: boolean
) => async (dispatch: Dispatch<AnyAction>): Promise<boolean> => {
  try {
    const payload = await jupyterHubApi.updateUser(
      username,
      updated_username,
      admin
    );
    dispatch({
      type: EDIT_USER,
      payload
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.message }
    });
    return false;
  }
  return true;
};

export const refreshUsers = () => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const payload = await jupyterHubApi.refreshUsers();
    dispatch({
      type: REFRESH_USERS,
      payload
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const startServer = (name: string, serverName: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    await jupyterHubApi.startServer(name, serverName);
    dispatch({
      type: START_SERVER,
      payload: { name, serverName }
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const stopServer = (name: string, serverName: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    await jupyterHubApi.stopServer(name, serverName);
    dispatch({
      type: STOP_SERVER,
      payload: { name, serverName }
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const startAllServers = (names: string[]) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    await jupyterHubApi.startAllServers(names);
    dispatch({
      type: START_ALL_SERVERS,
      payload: names
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const stopAllServers = (names: string[]) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    await jupyterHubApi.stopAllServers(names);
    dispatch({
      type: STOP_ALL_SERVERS,
      payload: names
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const shutdownHub = () => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    await jupyterHubApi.shutdownHub();
    dispatch({
      type: SHUTDOWN_HUB
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const clearUserError = () => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  dispatch({
    type: USER_ERROR_CLEAR
  });
};

export const clearUserSuccess = () => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  dispatch({
    type: USER_SUCCESS_CLEAR
  });
};
