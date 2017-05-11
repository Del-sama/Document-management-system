import * as actionTypes from '../actions/actionTypes';

const initialState = []
export default (state= initialState, action) => {
  let documents;
  switch (action.type) {
    case actionTypes.DOCUMENT_CREATED:
      documents = [action.document, ...state.documents.documents];
      return Object.assign({}, state, {createStatus: action.status}, {documents: {documents}});
    case actionTypes.DOCUMENT_CREATE_FAILED:
      return { ...state, status: action.status };
    case actionTypes.ALL_DOCUMENTS:
      return { ...state, documents: action.documents };
    case actionTypes.VIEW_ALL_DOCUMENTS_SUCCESS:
      return { ...state, documents: action.documents, pageCount: action.pageCount };
    case actionTypes.DOCUMENT_DELETED:
      documents = state.documents.documents.filter((document) => {
          return document.id !== action.documentId;
        });
     return Object.assign({}, state, {documents: {documents}});
    case actionTypes.SEARCH_DOCS_COMPLETE:
      return { ...state, search: action.documents, status: action.status };
    case actionTypes.SEARCH_DOCS_FAILED:
      return { ...state, status: action.status };
    default:
      return state;
  }
}
