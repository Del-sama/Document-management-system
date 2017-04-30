import * as actionTypes from '../actionTypes';

export default () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_ALL,
      documents: []
    });
  };
};