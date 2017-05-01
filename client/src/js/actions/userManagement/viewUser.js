import axios from 'axios';
import * as actionTypes from '../actionTypes';

export default (token, userId) => {
  return (dispatch) => {
    axios.get(`/users/${userId}`, {
      headers: {
        Authorization: token
      }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.VIEW_USER,
          user: response.data
        });
      }).catch((err) => {
          console.log(err);
          dispatch({
            type: actionTypes.USER_RETRIEVAL_FAILED,
            status: 'failed',
            error: err.message
          });
      });
  };
};