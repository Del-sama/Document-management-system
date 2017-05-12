import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';

/**
 *readAllDocuments action - dispatches the action to get all documents
 * @export
 * @function
 */
const viewAllDocuments = (offset) => {
  if(offset === undefined) {
    offset = 0;
  }
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    return axios.get(`/documents?offset=${offset}`, {
      headers: {
       Authorization: token
      }
    }).then(response => {
      return dispatch({
        type: actionTypes.VIEW_ALL_DOCUMENTS_SUCCESS,
        documents: response.data.documents,
        pageCount: response.data.pagination.pages
      });
    }).catch((err) => {
      });
  };
};

export default viewAllDocuments;