import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import deleteDoc from '../../js/actions/documentManagement/deleteDocuments';
import * as types from '../../js/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Delete Document Action', () => {
  it('dispatches DOCUMENT_DELETED when document is deleted ',
    () => {
      const documentId = 5

      const expectedActions = [
        { type: types.DOCUMENT_DELETED,
          status: 'success',
          documentId
        }];

      const store = mockStore({ documentReducer: {} });

      store.dispatch(deleteDoc(documentId))
        .then((res) => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
});