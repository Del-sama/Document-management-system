import * as actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.GET_USER_SUCCESS:
      return { ...state, users: action.users };
    case actionTypes.VIEW_USER:
      console.log(action);
      return { ...state, user: action.user };
    default:
      return state;
  }
};