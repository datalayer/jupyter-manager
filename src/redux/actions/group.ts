import { Dispatch, AnyAction } from 'redux';
import { jhapiRequest } from '../../api/hubHandler';
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
  GROUP_ERROR,
  GROUP_ERROR_CLEAR,
  GROUP_SUCCESS_CLEAR
} from './index';

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

// Get current group.
export const getCurrentGroup = (groupname: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const res = await (
      await jhapiRequest('/groups/' + groupname, 'GET')
    ).json();

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

// Get all groups.
export const getGroupsPagination = (offset: number, limit: number) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const res = await (
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

// Create group.
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
    const res = await (
      await jhapiRequest(
        '/groups/' + groupname + '/properties',
        'PUT',
        propobject
      )
    ).json();

    dispatch({
      type: UPDATE_GROUP_PROPS,
      payload: res
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
    const res = await (await jhapiRequest('/groups', 'GET')).json();

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
    const res = await (
      await jhapiRequest('/groups/' + groupname + '/users', 'DELETE', { users })
    ).json();

    dispatch({
      type: REMOVE_FROM_GROUP,
      payload: res
    });
  } catch (err: any) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err }
    });
  }
};

export const addUserToGroup = (groupname: string, username: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const resStatus = (await jhapiRequest('/users/' + username, 'GET')).status;
    if (resStatus <= 200) {
      const res = await (
        await jhapiRequest('/groups/' + groupname + '/users', 'POST', {
          users: [username]
        })
      ).json();

      dispatch({
        type: ADD_TO_GROUP,
        payload: res
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

export const clearGroupError = () => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  dispatch({
    type: GROUP_ERROR_CLEAR
  });
};

export const clearGroupSuccess = () => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  dispatch({
    type: GROUP_SUCCESS_CLEAR
  });
};
