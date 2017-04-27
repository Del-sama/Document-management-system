import axios from 'axios';

export default (token) => {
  return (dispatch) => {
    return axios.get('/users', {
      headers: {
        Authorization: token
      }
    })
      .then((response) => {
        dispatch({
          type: 'VIEW_ALL_USERS',
          users: response.data.users,
        });
      }).catch((err) => {
        dispatch({
          type: 'USER_RETRIEVAL_FAILED',
          status: 'failed',
          error: err.message
        });
      });
  };
};