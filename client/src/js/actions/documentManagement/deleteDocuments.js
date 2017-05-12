import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';

/**
 *deleteDocument action - dispatches the action to delete documents
 * @export
 * @function
 */
export default (documentId) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    return axios.delete(`/documents/${documentId}`, {
      headers: {
        Authorization: token
      }
    })
    .then((response) => {
      dispatch({
        type: actionTypes.DOCUMENT_DELETED,
        status: 'success',
        documentId
      });
    }).catch((err) => {
      dispatch({
        type: actionTypes.DOCUMENT_DELETION_FAILED,
        status: 'failed',
        error: err.message
      });
    });
  };
};