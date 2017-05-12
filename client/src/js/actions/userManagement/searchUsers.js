import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';

/**
 *searchUsers action - dispatches the action to search for users
 * @export
 * @function
 */
export default (details, offset) => {
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    return axios.get('/search/users', {
      params: {
        q: details,
        offset
      },
      headers: {
        Authorization: token
      },
    })
    .then((users) => {
      dispatch({
        type: actionTypes.SEARCH_USER_COMPLETE,
        users,
        status: 'success'
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.SEARCH_USER_FAILED,
        status: 'failed',
        error: err.message
      });
    });
  };
};