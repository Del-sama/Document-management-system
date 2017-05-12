import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';

/**
 *deleteUser action - dispatches the action to delete users
 * @export
 * @function
 */
export default (userId) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    return axios.delete(`/users/${userId}`, {
      headers: {
        Authorization: token
      }
    })
    .then(() => {
      dispatch({
        type: actionTypes.USER_DELETED,
        status: 'success',
        deletedUserId: userId
      });
    }).catch((err) => {
      dispatch({
        type: actionTypes.USER_DELETION_FAILED,
        status: 'failed',
        error: err.message
      });
    });
  };
};