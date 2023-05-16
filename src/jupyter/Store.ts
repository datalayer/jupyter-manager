import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './hub/reducers';

const initialState = {
  user_data: null,
  user_page: { offset: 0, limit: 10 },
  name_filter: '',
  groups_data: null,
  groups_page: { offset: 0, limit: 10 },
  config: {},
  config_schema: {},
  limit: 10
};

const middleware = [thunk];

const store: Store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
/*
export const initialState = {
  user_data: null,
  user_page: { offset: 0, limit: 10 },
  name_filter: '',
  groups_data: null,
  groups_page: { offset: 0, limit: 10 },
  config: {},
  config_schema: {},
  limit: 10
};

export type Group = {
  kind: 'group';
  name: string;
  properties: Record<string, any>;
  roles: string[];
  users: string[];
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

export type ManagerState = {
  user_data: User[] | null;
  user_page: { offset: number; limit: number; total?: number; next?: any };
  name_filter: string;
  groups_data: Group[] | null;
  groups_page: { offset: number; limit: number; total?: number; next?: any };
  config: any;
  config_schema: any;
  limit: number;
};

export const reducers = (
  state: ManagerState = initialState,
  action: any
): ManagerState => {
  switch (action.type) {
    case 'UPDATE_CONFIG':
      return Object.assign({}, state, {
        config: action.value.config
      });
    case 'SET_CONFIG_SCHEMA':
      return Object.assign({}, state, {
        config_schema: action.value.config_schema
      });
    // Updates the client user model data and stores the page.
    case 'USER_OFFSET':
      return Object.assign({}, state, {
        user_page: Object.assign({}, state.user_page, {
          offset: action.value.offset
        })
      });
    case 'USER_NAME_FILTER': {
      // set offset to 0 if name filter changed, otherwise leave it alone.
      const newOffset =
        action.value.name_filter !== state.name_filter ? 0 : state.name_filter;
      return Object.assign({}, state, {
        user_page: Object.assign({}, state.user_page, {
          offset: newOffset
        }),
        name_filter: action.value.name_filter
      });
    }
    case 'USER_PAGE':
      return Object.assign({}, state, {
        user_page: action.value.page,
        user_data: action.value.data
      });
    // Updates the client group user model data and stores the page.
    case 'GROUPS_OFFSET':
      return Object.assign({}, state, {
        groups_page: Object.assign({}, state.groups_page, {
          offset: action.value.offset
        })
      });
    case 'GROUPS_PAGE':
      return Object.assign({}, state, {
        groups_page: action.value.page,
        groups_data: action.value.data
      });
    default:
      return state;
  }
};
*/
