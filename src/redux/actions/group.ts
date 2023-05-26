import { Dispatch, AnyAction } from 'redux';
import { jupyterHubAPIRequest } from '../../api/hubHandler';
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
    const res = await jupyterHubAPIRequest('/groups/' + groupname, 'GET');
    if (res.status >= 400) {
      if (res.status === 404) {
        throw new Error("Group doesn't exist");
      } else {
        throw new Error('Error fetching group: ' + res.statusText);
      }
    }
    const payload = await res.json();
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
    const res = await jupyterHubAPIRequest(
      `/groups?offset=${offset}&limit=${limit}`,
      'GET'
    );
    if (res.status >= 400) {
      throw new Error('Error fetching groups: ' + res.statusText);
    }
    const payload = await res.json();
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
    const res = await jupyterHubAPIRequest('/groups/' + groupname, 'POST');
    if (res.status >= 400) {
      if (res.status === 409) {
        throw new Error('Group already exists');
      } else {
        throw new Error('Error creating group: ' + res.statusText);
      }
    }
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
    const res = await jupyterHubAPIRequest('/groups/' + groupname, 'DELETE');
    if (res.status >= 400) {
      throw new Error('Error deleting group: ' + res.statusText);
    }
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
    const res = await jupyterHubAPIRequest(
      '/groups/' + groupname + '/properties',
      'PUT',
      propobject
    );
    if (res.status >= 400) {
      throw new Error('Error updating group properties: ' + res.statusText);
    }
    const payload = await res.json();
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
    const res = await jupyterHubAPIRequest('/groups', 'GET');
    if (res.status >= 400) {
      throw new Error('Error refreshing groups: ' + res.statusText);
    }
    const payload = await res.json();
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
    const res = await jupyterHubAPIRequest(
      '/groups/' + groupname + '/users',
      'DELETE',
      { users }
    );
    if (res.status >= 400) {
      throw new Error('Error removing users: ' + res.statusText);
    }
    const payload = await res.json();
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
    const resStatus = (await jupyterHubAPIRequest('/users/' + username, 'GET')).status;
    if (resStatus === 200) {
      const res = await jupyterHubAPIRequest(
        '/groups/' + groupname + '/users',
        'POST',
        {
          users: [username]
        }
      );
      if (res.status >= 400) {
        throw new Error(
          `Error adding user ${username} to group ${res.statusText}`
        );
      }
      const payload = await res.json();
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
