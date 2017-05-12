import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import editDoc from '../../js/actions/documentManagement/editDocument';
import * as types from '../../js/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Edit Document Action', () => {
  it('dispatches DOCUMENT_UPDATE when document is updated ',
    () => {
      const documentId = 5
      const document = { title: 'A' }
      const details = { title: 'B'}

      const expectedActions = [
        { type: types.DOCUMENT_UPDATE,
          status: 'success',
          document,
          documentId
        }];

      const store = mockStore({ documentReducer: {} });

      store.dispatch(editDoc(details, documentId))
        .then((res) => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
});