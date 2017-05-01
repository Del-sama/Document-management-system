import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';

const documentReadSuccess = function (documents) {
  return {
    type: actionTypes.VIEW_ALL_DOCUMENTS_SUCCESS,
    documents
  }
}

export const viewAllDocuments = (userId) => {
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    return axios.get('/documents', {
      headers: {
        'authorization': token
      }
    }).then(response => {
      dispatch(documentReadSuccess(response.data));
    }).catch((err) => {
      });
  };
};