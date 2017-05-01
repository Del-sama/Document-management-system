import axios from 'axios';
import * as actionTypes from '../actionTypes';

export default (token, userData, userId) => {
  return (dispatch) => {
    return axios.put(`/users/${userId}`, userData, {
      headers: {
        Authorization: token
      }
    })
      .then(() => {
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
