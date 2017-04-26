import * as actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.DOCUMENT_CREATED:
      return { ...state, createStatus: action.status, documents: action.documents };
    case actionTypes.DOCUMENT_CREATE_FAILED:
      return { ...state, status: action.status };
    case 'ALL_DOCUMENTS':
      return { ...state, documents: action.documents };
      case actionTypes.VIEW_ALL_DOCUMENTS_SUCCESS:
      return { ...state, document: action.documents };
    case 'DOCUMENT_DELETED':
      return { ...state,
        documents: state.documents.filter((document) => {
          return document.id !== action.documentid;
        })
      };
    default:
      return state;
  }
}