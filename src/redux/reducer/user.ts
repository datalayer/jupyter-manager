import { userInitialState, UserState } from './../state/user';
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
        users: payload.items,
        user_page: payload._pagination
      };
    // make sure you go redirect after these:
    case ADD_USERS:
      return {
        ...state,
        success: 'User(s) added successfully!'
      };
    case EDIT_USER:
      return {
        ...state,
        success: 'User edited successfully!',
        user: payload
      };
    case DELETE_USER:
      return {
        ...state,
        success: 'User deleted successfully!'
      };
    case SHUTDOWN_HUB:
      return {
        ...state,
        success: 'Jupyterhub shutdown successful!'
      };
    // make sure you call user pagination after these:
    case START_SERVER: {
      const updatedUsers = state.users.map(user => {
        if (user.name === payload.name) {
          return {
            ...user,
            servers: {
              ...user.servers,
              [payload.serverName]: {
                ...user.servers[payload.serverName],
                ready: true,
                stopped: false
              }
            }
          };
        }
        return user;
      });
      return {
        ...state,
        users: updatedUsers,
        success: 'Server started successfully!'
      };
    }
    case STOP_SERVER: {
      const updatedUsers = state.users.map(user => {
        if (user.name === payload.name) {
          return {
            ...user,
            servers: {
              ...user.servers,
              [payload.serverName]: {
                ...user.servers[payload.serverName],
                ready: false,
                stopped: true
              }
            }
          };
        }
        return user;
      });
      return {
        ...state,
        users: updatedUsers,
        success: 'Server stopped successfully!'
      };
    }
    case START_ALL_SERVERS: {
      const updatedUsers = state.users.map(user => {
        if (payload.includes(user.name)) {
          return {
            ...user,
            servers: {
              '': {
                ...user.servers[''],
                ready: true,
                stopped: false
              }
            }
          };
        }
        return user;
      });
      return {
        ...state,
        users: updatedUsers,
        success: 'Servers started successfully!'
      };
    }
    case STOP_ALL_SERVERS: {
      const updatedUsers = state.users.map(user => {
        if (payload.includes(user.name)) {
          return {
            ...user,
            servers: {
              '': {
                ...user.servers[''],
                ready: false,
                stopped: true
              }
            }
          };
        }
        return user;
      });
      return {
        ...state,
        users: updatedUsers,
        success: 'Servers stopped successfully!'
      };
    }
    // error
    case USER_ERROR:
      return {
        ...state,
        error: payload.msg,
        loading: false
      };
    case USER_ERROR_CLEAR:
      return {
        ...state,
        error: null,
        loading: false
      };
    case USER_SUCCESS_CLEAR:
      return {
        ...state,
        success: null,
        loading: false
      };
    default:
      return state;
  }
}

export default userReducer;
