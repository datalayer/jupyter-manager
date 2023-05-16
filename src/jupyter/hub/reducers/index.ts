import { combineReducers } from 'redux';
import group from './group';
import user from './user';

export default combineReducers({
  group,
  user
});
