import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';

const documentReadSuccess = function (documents) {
  return {
    type: actionTypes.VIEW_USER_DOCUMENTS_SUCCESS,
    documents
  }
}

/**
 *viewDocument action - dispatches the action to get a single document
 * @export
 * @function
 */
export const viewUserDocuments = (userId) => {
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    return axios.get(`/users/${userId}/documents`, {
      headers: {
        'authorization': token
      }
    }).then(documents => {
      dispatch(documentReadSuccess(documents));
    }).catch((err) => {
      });
  };
};