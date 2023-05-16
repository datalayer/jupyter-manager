import { jhapiRequest } from '../utils/jhapiUtil';

import {
  GROUP_PAGINATION,
  SET_GROUP_OFFSET,
  REFRESH_GROUPS,
  ADD_TO_GROUP,
  REMOVE_FROM_GROUP,
  UPDATE_GROUP_PROPS,
  CREATE_GROUP,
  DELETE_GROUP,
  GET_GROUP,
  GROUP_ERROR
} from './types';
import { Dispatch, AnyAction } from 'redux';

export const setGroupOffset = (offset: number) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    dispatch({
      type: SET_GROUP_OFFSET,
      payload: offset
    });
  } catch (err: any) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err }
    });
  }
};

// Get current group
export const getCurrentGroup = (groupname: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const res = (await jhapiRequest('/groups/' + groupname, 'GET')).json();

    dispatch({
      type: GET_GROUP,
      payload: res
    });
  } catch (err: any) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err }
    });
  }
};

// Get all groups
export const getGroupsPagination = (offset: number, limit: number) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const res = (
      await jhapiRequest(`/groups?offset=${offset}&limit=${limit}`, 'GET')
    ).json();

    dispatch({
      type: GROUP_PAGINATION,
      payload: res
    });
  } catch (err: any) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err }
    });
  }
};

// Create group
export const createGroup = (groupname: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    await jhapiRequest('/groups/' + groupname, 'POST');

    dispatch({
      type: CREATE_GROUP
    });
  } catch (err: any) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err }
    });
  }
};

export const deleteGroup = (groupname: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    await jhapiRequest('/groups/' + groupname, 'DELETE');

    dispatch({
      type: DELETE_GROUP
    });
  } catch (err: any) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err }
    });
  }
};

export const updateGroupProps = (
  groupname: string,
  propobject: Record<string, string>
) => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
  try {
    await jhapiRequest(
      '/groups/' + groupname + '/properties',
      'PUT',
      propobject
    );

    dispatch({
      type: UPDATE_GROUP_PROPS
    });
  } catch (err: any) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err }
    });
  }
};

export const refreshGroups = () => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const res = (await jhapiRequest('/groups', 'GET')).json();

    dispatch({
      type: REFRESH_GROUPS,
      payload: res
    });
  } catch (err: any) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err }
    });
  }
};

export const removeFromGroup = (groupname: string, users: string[]) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    await jhapiRequest('/groups/' + groupname + '/users', 'DELETE', { users });

    dispatch({
      type: REMOVE_FROM_GROUP
    });
  } catch (err: any) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err }
    });
  }
};

export const addUsersToGroup = (groupname: string, username: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const resStatus = (await jhapiRequest('/users/' + username, 'GET')).status;
    if (resStatus > 200) {
      await jhapiRequest('/groups/' + groupname + '/users', 'POST', {
        users: [username]
      });

      dispatch({
        type: ADD_TO_GROUP
      });
    } else {
      throw new Error('User does not exist');
    }
  } catch (err: any) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err }
    });
  }
};
