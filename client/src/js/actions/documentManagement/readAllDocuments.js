import axios from 'axios';
import { browserHistory } from 'react-router';

const documentReadSuccess = function (documents) {
  return {
    type: 'VIEW_ALL_DOCUMENTS_SUCCESS',
    documents
  }
}

export const viewAllDocuments = (UserId) => {
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    return axios.get('/app/documents', {
      headers: {
        'authorization': token
      }
    }).then(documents => {
      dispatch(documentReadSuccess(documents));
    }).catch((err) => {
      });
  };
};