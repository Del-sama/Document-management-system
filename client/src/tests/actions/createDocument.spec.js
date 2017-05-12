import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import createDoc from '../../js/actions/documentManagement/newDocument';
import * as types from '../../js/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Create Document Action', () => {
  it.only('dispatches DOCUMENT_CREATED when document is created',
    () => {
      const details = { title: 'A' }

      const expectedActions = [
        { type: types.DOCUMENT_CREATED,
           document: details,
          status: 'success'
        }];

      const store = mockStore({ documentReducer: {} });

      store.dispatch(createDoc(details))
        .then((res) => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
});