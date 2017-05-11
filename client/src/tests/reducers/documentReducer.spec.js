import expect from 'expect';
import * as actionTypes from '../../js/actions/actionTypes';
import documentReducer from '../../js/reducers/documents'


describe('Document Reducer', () => {
  it('should return the initial state', () => {
    expect(
      documentReducer(undefined, [])
    ).toEqual(
      []
    )
  });
});

