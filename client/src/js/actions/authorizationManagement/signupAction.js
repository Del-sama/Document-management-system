import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as actionTypes from '../actionTypes';

export const loginSuccessful = user => ({ type: actionTypes.LOGIN_SUCCESFUL, user });

export default (userData) => {
  return (dispatch) => {
    console.log("user data========>", userData)
    return axios.post('/users', userData)
      .then((response) => {
        window.localStorage.setItem('token', response.data.token);
        const user = jwtDecode(response.data.token);
         dispatch({
          type: actionTypes.LOGIN_SUCCESSFUL,
          user
        })
      })
      .catch((error) => {
        console.log("error========>", error)
        dispatch({
          type: actionTypes.SIGNUP_FAILED,
          message: error.response.data.message
        })
      });
  };
};
