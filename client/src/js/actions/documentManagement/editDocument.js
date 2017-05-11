import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';

export default (details, documentId) => {
  return (dispatch) => {
    const token=window.localStorage.getItem('token');
    if(!token){
      return null;
    }
    details.status = 'waiting';
    return axios.put(`/documents/${documentId}`, details, {
      headers: {
        Authorization: token
      }
    })
    .then(() => {
      dispatch({
        type: actionTypes.DOCUMENT_UPDATE,
        status: 'success',
        documentId
      })
      browserHistory.push('/app/dashboard');
    }).catch((err) => {
      dispatch({
        type: actionTypes.DOCUMENT_UPDATE_FAILED,
        status: 'failed',
        error: err.message
      });
    });
  };
};