import { combineReducers } from 'redux';
import loginReducer from './login';
import signupReducer from './signup';
import documentReducer from './document';

export default combineReducers({
  loginReducer,
  signupReducer,
  documentReducer
});