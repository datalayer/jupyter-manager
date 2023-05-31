import { Dispatch, AnyAction } from 'redux';
import jupyterHubApi from '../../api/jupyterHubAPI';
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

export const getCurrentGroup = (groupname: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const payload = await jupyterHubApi.getGroup(groupname);
    dispatch({
      type: GET_GROUP,
      payload
    });
  } catch (err: any) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const getGroupsPagination = (offset: number, limit: number) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const payload = await jupyterHubApi.updateGroups(offset, limit);
    dispatch({
      type: GROUP_PAGINATION,
      payload
    });
  } catch (err: any) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const createGroup = (groupname: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    await jupyterHubApi.createGroup(groupname);
    dispatch({
      type: CREATE_GROUP
    });
  } catch (err: any) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const deleteGroup = (groupname: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    await jupyterHubApi.deleteGroup(groupname);
    dispatch({
      type: DELETE_GROUP
    });
  } catch (err: any) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const updateGroupProps = (
  groupname: string,
  propobject: Record<string, string>
) => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
  try {
    const payload = await jupyterHubApi.updateGroup(propobject, groupname);
    dispatch({
      type: UPDATE_GROUP_PROPS,
      payload
    });
  } catch (err: any) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const refreshGroups = () => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const payload = await jupyterHubApi.refreshGroups();
    dispatch({
      type: REFRESH_GROUPS,
      payload
    });
  } catch (err: any) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const removeFromGroup = (groupname: string, users: string[]) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const payload = await jupyterHubApi.removeUsersFromGroup(users, groupname);
    dispatch({
      type: REMOVE_FROM_GROUP,
      payload
    });
  } catch (err: any) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const addUserToGroup = (groupname: string, username: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const userExists = await jupyterHubApi.validateUser(username);
    if (userExists) {
      const payload = await jupyterHubApi.addUsersToGroup(
        [username],
        groupname
      );
      dispatch({
        type: ADD_TO_GROUP,
        payload
      });
    } else {
      throw new Error('User does not exist.');
    }
  } catch (err: any) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.message }
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
