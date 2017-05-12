import * as actionTypes from '../actionTypes';

/**
 *logout action - dispatches the action to logout users
 * @export
 * @function
 */
export default () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_ALL,
      documents: []
    });
  };
};