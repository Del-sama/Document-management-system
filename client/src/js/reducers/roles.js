import * as actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_ROLE_SUCCESS:
      return { ...state, roles: action.roles };
    case actionTypes.ROLE_RETRIEVAL_FAILED:
      return [...state, Object.assign({}, action.status)];
    case actionTypes.ADD_ROLE_SUCCESS:
      return { ...state, createStatus: action.status, roles: action.roles };
    default:
      return state;
  }
};
