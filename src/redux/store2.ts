import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer/index';
import { GroupState, groupInitialState } from './state/group';
import { UserState, userInitialState } from './state/user';
import { ConfigState, configInitialState } from './state/config';

const initialState = {
  group: groupInitialState,
  user: userInitialState,
  config: configInitialState,
  limit: 10
};

const middleware = [thunk];

export type MainState = {
  group: GroupState;
  user: UserState;
  config: ConfigState;
  limit: number;
};

const store: Store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
