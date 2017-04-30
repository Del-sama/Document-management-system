import { combineReducers } from 'redux';
import loginReducer from './login';
import signupReducer from './signup';
import documentReducer from './documents';
import userReducer from './users';
import roleReducer from './roles';


export default combineReducers({
  loginReducer,
  signupReducer,
  documentReducer,
  userReducer,
  roleReducer
});