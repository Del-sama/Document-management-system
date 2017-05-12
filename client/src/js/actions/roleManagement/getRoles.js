import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';

const roleGetSuccess = (roles) => {
  return {
    type: actionTypes.GET_ROLE_SUCCESS,
    roles
  };
};

/**
 *getRoles action - dispatches the action to get roles
 * @export
 * @function
 */
export const viewRoles = (userId) => {
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    axios.get('/roles', {
      headers: {
        Authorization: token
      }
    }).then((response) => {
      dispatch(roleGetSuccess(response.data));
    })
    .catch((err) => {
    });
  };
};
