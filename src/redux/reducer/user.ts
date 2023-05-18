import { userInitialState, UserState } from "./../state/user"
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
  USER_ERROR
} from './../actions';

function userReducer(
  state: UserState = userInitialState,
  action: {
    type: string;
    payload: any;
  }
): UserState {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false
      };
    case USER_PAGINATION:
      return {
        ...state,
        users: payload.items,
        user_page: payload._pagination,
        loading: false
      };
    case SET_USER_OFFSET:
      return {
        ...state,
        user_page: {
          ...state.user_page,
          offset: payload
        },
        loading: false
      };
    case SET_NAME_FILTER:
      return {
        ...state,
        name_filter: payload,
        loading: false
      };
    case REFRESH_USERS:
      return {
        ...state,
        users: payload
      };
    // make sure you go redirect after these:
    case ADD_USERS:
      return state;
    case EDIT_USER:
      return {
        ...state,
        user: payload
      };
    case DELETE_USER:
      return state;
    // make sure you call user pagination after these:
    case START_SERVER:
    case STOP_SERVER:
    case START_ALL_SERVERS:
    case STOP_ALL_SERVERS:
      return state;
    // error
    case USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}

export default userReducer;
