import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';

/**
 *newRole action - dispatches the action to create new roles
 * @export
 * @function
 */
export default (details) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    return axios.post('/roles', details, {
      headers: {
        Authorization: token
      }
    }).then((role) => {
      dispatch({
        type: actionTypes.ROLE_CREATED,
        role,
        status: 'success'
      });
      browserHistory.push('/app/dasboard');
    }).catch((err) => {
      dispatch({
        type: actionTypes.ROLE_CREATE_FAILED,
        status: 'failed',
        error: err.message
      });
    });
  };
};