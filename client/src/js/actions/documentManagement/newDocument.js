import axios from 'axios';
import { browserHistory } from 'react-router';

export default (details) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    return axios.post('/documents', details, {
      headers: {
        Authorization: `User ${token}`
      }
    })
      .then(() => {
        dispatch({
          type: 'DOCUMENT_CREATED',
          document,
          status: 'success'
        });
        browserHistory.push('/');
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