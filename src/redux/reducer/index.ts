import { combineReducers } from 'redux';
import group from './group';
import user from './user';
import config from './config';

export default combineReducers({
  group,
  user,
  config
});
