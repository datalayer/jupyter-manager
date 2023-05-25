import { groupInitialState, GroupState } from './../state/group';
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
} from './../actions';

function groupReducer(
  state: GroupState = groupInitialState,
  action: {
    type: string;
    payload: any;
  }
): GroupState {
  const { type, payload } = action;

  switch (type) {
    case GET_GROUP:
      return {
        ...state,
        group: payload,
        loading: false
      };
    case GROUP_PAGINATION:
      return {
        ...state,
        groups: payload.items,
        group_page: payload._pagination,
        loading: false
      };
    case SET_GROUP_OFFSET:
      return {
        ...state,
        group_page: {
          ...state.group_page,
          offset: payload
        },
        loading: false
      };
    case REFRESH_GROUPS:
      return {
        ...state,
        groups: payload.items,
        group_page: payload._pagination,
        loading: false
      };
    case ADD_TO_GROUP:
      return {
        ...state,
        group: payload,
        success: 'User added successfully!',
        loading: false
      };
    case REMOVE_FROM_GROUP:
      return {
        ...state,
        group: payload,
        success: 'User removed successfully!',
        loading: false
      };
    case UPDATE_GROUP_PROPS:
      return {
        ...state,
        group: payload,
        success: 'Group updated successfully!',
        loading: false
      };
    case CREATE_GROUP:
      return {
        ...state,
        success: 'Group created successfully!',
        loading: false
      };
    case DELETE_GROUP:
      return {
        ...state,
        success: 'Group deleted successfully!',
        loading: false
      };
    case GROUP_ERROR:
      return {
        ...state,
        error: payload.msg,
        loading: false
      };
    case GROUP_ERROR_CLEAR:
      return {
        ...state,
        error: null,
        loading: false
      };
    case GROUP_SUCCESS_CLEAR:
      return {
        ...state,
        success: null,
        loading: false
      };
    default:
      return state;
  }
}

export default groupReducer;
