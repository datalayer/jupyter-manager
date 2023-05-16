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
} from '../actions/types';

const initialState = {
  loading: true,
  error: {},
  user: null,
  users: [],
  user_page: { offset: 0, limit: 10 }
};

export type UserState = {
  loading: boolean;
  error: any;
  user: User | null;
  users: User[];
  user_page: { offset: number; limit: number; total?: number; next?: any };
};

export type Server = {
  last_activity: string | null;
  name: string;
  pending: boolean | null;
  progress_url: string;
  ready: boolean;
  started: boolean | null;
  state: any;
  stopped: boolean;
  url: string;
  user_options: any;
};

export type User = {
  admin: boolean;
  auth_state: any;
  created: string;
  groups: string[];
  kind: 'user';
  last_activity: string | null;
  name: string;
  pending: boolean | null;
  roles: string[];
  server: Server | null;
  servers: Server[];
};

function userReducer(
  state: UserState = initialState,
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
    case REFRESH_USERS:
      return {
        ...state,
        users: payload
      };
    // make sure you go redirect after these:
    case ADD_USERS:
    case EDIT_USER:
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
