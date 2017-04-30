import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as actionTypes from '../actionTypes';

export default (loginCredentials) => {
  return (dispatch) => {
    return axios.post('/users/login', loginCredentials)
      .then((response) => {
        const token = response.data.token;
        const user = jwtDecode(token).user;
        window.localStorage.setItem('token', token);
        dispatch({
          type: actionTypes.LOGIN_SUCCESSFUL,
          user,
          token,
          message: 'Login Successful'
        });
      }).catch((error) => {
        dispatch({
          type: actionTypes.LOGIN_ERROR,
          message: error.response.data.error
        });
      });
  };
};