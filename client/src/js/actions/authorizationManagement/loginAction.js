import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default (loginCredentials) => {
  return (dispatch) => {
    return axios.post('/app/users/login', loginCredentials)
      .then((response) => {
        const token = response.data.token;
        const user = jwtDecode(token).user;
        window.localStorage.setItem('token', token);
        dispatch({
          type:'LOGIN_SUCCESSFUL',
          user,
          token,
          message: 'Login Successful'
        });
      }).catch((error) => {
        dispatch({
          type: 'LOGIN_ERROR',
          message: error.response.data.error
        });
      });
  };
};