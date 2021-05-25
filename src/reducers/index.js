import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import layout from './layout';
import blockchain from './blockchain';
import vault from './vault';

export default combineReducers({
  alerts,
  auth,
  navigation,
  layout,
  blockchain,
  vault
});
