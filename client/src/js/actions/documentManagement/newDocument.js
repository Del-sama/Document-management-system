import axios from 'axios';
import { browserHistory } from 'react-router';

export default (details) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    return axios.post('/app/documents', details, {
      headers: {
        Authorization: token
      }
    })
      .then(() => {
        dispatch({
          type: 'DOCUMENT_CREATED',
          document,
          status: 'success'
        });
        browserHistory.push('/app/dashboard');
      }).catch((err) => {
        dispatch({
          type: 'DOCUMENT_CREATE_FAILED',
          document,
          status: 'failed',
          error: err.message
        });
      });
  };
};