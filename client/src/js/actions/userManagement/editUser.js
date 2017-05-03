import axios from 'axios';
import * as actionTypes from '../actionTypes';

export default (userData, userId) => {
  const token = window.localStorage.getItem('token');
  console.log('editing this user');
  return (dispatch) => {
    return axios.put(`/users/${userId}`, userData, {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        console.log(res, userData);
        dispatch({
          type: actionTypes.USER_UPDATED,
          user: Object.assign({}, userData, {
            id: userId
          })
        });
      }).catch((err) => {
        console.log(err);
        dispatch({
          type: actionTypes.USER_UPDATE_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};
