import * as actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case 'ALL_DOCUMENTS':
      return { ...state, documents: action.documents };
    case actionTypes.VIEW_USER_DOCUMENTS_SUCCESS:
      return { ...state, document: action.documents };
    default:
      return state;
  }
}