import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';

/**
 *editRole action - dispatches the action to edit roles
 * @export
 * @function
 */
export default (details, token, roleid) => {
  return (dispatch) => {
    return axios.put(`/roles/${roleid}`, details, {
      headers: {
        Authorization: token
      }
    }).then((res) => {
      browserHistory.push('/app/dashboard');
    }).catch((err) => {
      dispatch({
        type: actionTypes.ROLE_UPDATE_FAILED,
        status: 'failed',
        error: err.message
      });
    });
  };
};