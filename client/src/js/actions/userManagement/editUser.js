import axios from 'axios';
import * as actionTypes from '../actionTypes';

/**
 *editUser action - dispatches the action to edit users
 * @export
 * @function
 */
export default (userData, userId) => {
  const token = window.localStorage.getItem('token');
  console.log(userData, 'userData', userId, 'userId');
  return (dispatch) => {
    return axios.put(`/users/${userId}`, userData, {
      headers: {
        Authorization: token
      }
    })
    .then((res) => {
      dispatch({
        type: actionTypes.USER_UPDATED,
        user: Object.assign({}, userData, {
          id: userId
        })
      });
    }).catch((err) => {
        dispatch({
          type: actionTypes.USER_UPDATE_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};
