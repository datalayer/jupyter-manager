import { jhapiRequest } from '../utils/jhapiUtil';

import {
  USER_PAGINATION,
  REFRESH_USERS,
  START_SERVER,
  STOP_SERVER,
  START_ALL_SERVERS,
  STOP_ALL_SERVERS,
  ADD_USERS,
  EDIT_USER,
  DELETE_USER,
  GET_USER,
  USER_ERROR
} from './types';
import { Dispatch, AnyAction } from 'redux';

// Get current user
export const getCurrentUser = (username: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const res = (await jhapiRequest('/users/' + username, 'GET')).json();

    dispatch({
      type: GET_USER,
      payload: res
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err }
    });
  }
};

// Get all users
export const getUsersPagination = (
  offset: number,
  limit: number,
  name_filter: string
) => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
  //dispatch({ type: CLEAR_USERS });

  try {
    const res = (
      await jhapiRequest(
        `/users?include_stopped_servers&offset=${offset}&limit=${limit}&name_filter=${
          name_filter || ''
        }`,
        'GET'
      )
    ).json();

    dispatch({
      type: USER_PAGINATION,
      payload: res
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err }
    });
  }
};

// Adds users
export const addUsers = (usernames: string[], admin: boolean) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    await jhapiRequest('/users', 'POST', { usernames, admin });

    dispatch({
      type: ADD_USERS
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err }
    });
  }
};

export const deleteUsers = (username: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    await jhapiRequest('/users/' + username, 'DELETE');

    dispatch({
      type: DELETE_USER
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err }
    });
  }
};

export const editUser = (
  username: string,
  updated_username: string,
  admin: boolean
) => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
  try {
    await jhapiRequest('/users/' + username, 'PATCH', {
      name: updated_username,
      admin
    });

    dispatch({
      type: EDIT_USER
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err }
    });
  }
};

export const refreshUsers = () => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const res = (await jhapiRequest('/users', 'GET')).json();

    dispatch({
      type: REFRESH_USERS,
      payload: res
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err }
    });
  }
};

export const startServer = (name: string, serverName: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    await jhapiRequest(
      '/users/' + name + '/servers/' + (serverName || ''),
      'POST'
    );

    dispatch({
      type: START_SERVER
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err }
    });
  }
};

export const stopServer = (name: string, serverName: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    await jhapiRequest(
      '/users/' + name + '/servers/' + (serverName || ''),
      'DELETE'
    );

    dispatch({
      type: STOP_SERVER
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err }
    });
  }
};

export const startAllServers = (names: string[]) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    names.map(
      async (e: string) => await jhapiRequest('/users/' + e + '/server', 'POST')
    );

    dispatch({
      type: START_ALL_SERVERS
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err }
    });
  }
};

export const stopAllServers = (names: string[]) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    names.map(
      async (e: string) =>
        await jhapiRequest('/users/' + e + '/server', 'DELETE')
    );

    dispatch({
      type: STOP_ALL_SERVERS
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err }
    });
  }
};
