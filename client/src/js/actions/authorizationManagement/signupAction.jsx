import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const loginSuccessful = user => ({ type: 'LOGIN_SUCCESSFUL', user });

export default (userData) => {
  return (dispatch) => {
    console.log(userData);
    return axios.post('/users', userData)
      .then((response) => {
        window.localStorage.setItem('token', response.data.token);
        const user = jwtDecode(response.data.token);
        dispatch(loginSuccessful(user));
      }).catch((error) => {
        console.log(Object.keys(error), error.message, error.response.data);
      });
  };
};
