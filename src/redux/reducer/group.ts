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
    // make sure you go redirect after these:
    case ADD_TO_GROUP:
    case REMOVE_FROM_GROUP:
    case UPDATE_GROUP_PROPS:
      return {
        ...state,
        group: payload,
        loading: false
      };
    // make sure you call user pagination after these:
    case CREATE_GROUP:
    case DELETE_GROUP:
      return {
        ...state,
        loading: false
      };
    // error
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
