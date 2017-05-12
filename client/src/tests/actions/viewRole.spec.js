import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import viewRole from '../../js/actions/roleManagement/viewRole';
import * as types from '../../js/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('View Role Action', () => {
  it('dispatches VIEW_ROLE when signup has been done',
    () => {
      const role = {
        id: 3,
        title: 'role'
      }

      const expectedActions = [
        { type: types.VIEW_ROLE,
          role
        }];

      const store = mockStore({ roleReducer: {} });

      store.dispatch(viewRole(role.id))
        .then((res) => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
});