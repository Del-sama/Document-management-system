import { combineReducers } from 'redux';
import loginReducer from './login';
import signupReducer from './signup';

export default combineReducers({
  loginReducer,
  signupReducer
});