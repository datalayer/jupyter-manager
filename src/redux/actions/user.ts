import { Dispatch, AnyAction } from 'redux';
import { jhapiRequest } from '../../api/hubHandler';
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
  USER_SUCCESS_CLEAR
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

// Get current user
export const getCurrentUser = (username: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const res = await jhapiRequest('/users/' + username, 'GET');
    if (res.status >= 400) {
      if (res.status === 404) {
        throw new Error("User doesn't exist");
      } else {
        throw new Error(res.statusText);
      }
    }
    const payload = await res.json();
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

// Get all users
export const getUsersPagination = (
  offset: number,
  limit: number,
  name_filter: string
) => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
  //dispatch({ type: CLEAR_USERS });

  try {
    const res = await jhapiRequest(
      `/users?include_stopped_servers&offset=${offset}&limit=${limit}&name_filter=${
        name_filter || ''
      }`,
      'GET'
    );
    if (res.status >= 400) {
      throw new Error(res.statusText);
    }
    const payload = await res.json();
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

// Adds users
export const addUsers = (usernames: string[], admin: boolean) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const res = await jhapiRequest('/users', 'POST', { usernames, admin });
    if (res.status >= 400) {
      if (res.status === 409) {
        throw new Error('User already exists');
      } else {
        throw new Error(res.statusText);
      }
    }
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
    const res = await jhapiRequest('/users/' + username, 'DELETE');
    if (res.status >= 400) {
      throw new Error(res.statusText);
    }
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
    const res = await jhapiRequest('/users/' + username, 'PATCH', {
      name: updated_username,
      admin
    });
    if (res.status >= 400) {
      if (res.status === 400) {
        throw new Error('Username is taken.');
      } else {
        throw new Error(res.statusText);
      }
    }
    const payload = await res.json();
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
    const res = await jhapiRequest('/users', 'GET');
    if (res.status >= 400) {
      throw new Error(res.statusText);
    }
    const payload = await res.json();
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
    const res = await jhapiRequest(
      '/users/' + name + '/servers/' + (serverName || ''),
      'POST'
    );
    if (res.status >= 400) {
      throw new Error(res.statusText);
    }
    dispatch({
      type: START_SERVER
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
    const res = await jhapiRequest(
      '/users/' + name + '/servers/' + (serverName || ''),
      'DELETE'
    );
    if (res.status >= 400) {
      throw new Error(res.statusText);
    }
    dispatch({
      type: STOP_SERVER
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
    names.map(async (e: string) => {
      const res = await jhapiRequest('/users/' + e + '/server', 'POST');
      if (res.status >= 400) {
        throw new Error('Error starting servers: ' + res.statusText);
      }
      return;
    });
    dispatch({
      type: START_ALL_SERVERS
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
    names.map(async (e: string) => {
      const res = await jhapiRequest('/users/' + e + '/server', 'DELETE');
      if (res.status >= 400) {
        throw new Error('Error stopping servers: ' + res.statusText);
      }
      return;
    });
    dispatch({
      type: STOP_ALL_SERVERS
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
