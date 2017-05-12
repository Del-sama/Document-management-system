import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';

/**
 *searchDocuments action - dispatches the action to search for documents
 * @export
 * @function
 */
export default (details, offset) => {
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    return axios.get('/search/documents', {
      headers: {
        Authorization: token
      },
      params: {
        q: details,
        offset
      }
    })
    .then((documents) => {
      dispatch({
        type: actionTypes.SEARCH_DOCS_COMPLETE,
        documents,
        status: 'success'
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.SEARCH_DOCS_FAILED,
        status: 'failed',
        error: err.message
      });
    });
  };
};
