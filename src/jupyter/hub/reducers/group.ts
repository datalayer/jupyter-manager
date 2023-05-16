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
} from '../actions/types';

const initialState = {
  loading: true,
  error: {},
  group: null,
  groups: [],
  group_page: { offset: 0, limit: 10 }
};

export type GroupState = {
  loading: boolean;
  error: any;
  group: Group | null;
  groups: Group[];
  group_page: { offset: number; limit: number; total?: number; next?: any };
};

export type Group = {
  kind: 'group';
  name: string;
  properties: Record<string, any>;
  roles: string[];
  users: string[];
};

function groupReducer(
  state: GroupState = initialState,
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
        }
      };
    case REFRESH_GROUPS:
      return {
        ...state,
        groups: payload
      };
    // make sure you go redirect after these:
    case ADD_TO_GROUP:
    case REMOVE_FROM_GROUP:
    case UPDATE_GROUP_PROPS:
      return state;
    // make sure you call user pagination after these:
    case CREATE_GROUP:
    case DELETE_GROUP:
      return state;
    // error
    case GROUP_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}

export default groupReducer;
