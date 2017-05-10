import expect from 'expect';
import * as actionTypes from '../../js/actions/actionTypes';
import loginReducer from '../../js/reducers/login';
import signupReducer from '../../js/reducers/signup';

describe('login reducer', ()=> {
  const initialState = {
    isAuthenticated: false,
  }
  it('should return the initial state', () => {
    expect(
      loginReducer(undefined, {})
    ).toEqual(
      {}
    )
  });

  it('should handle LOGIN_SUCCESSFUL', () => {
    expect(
      loginReducer({
        userName: "Del",
        password: 12345
      }, actionTypes.LOGIN_SUCCESSFUL)
    ).toEqual(
    {
     "password": 12345,
      "userName": "Del"})
  });
});

describe('signup reducer', ()=> {
  it('should return the initial state', () => {
    expect(
      signupReducer(undefined, {})
    ).toEqual(
      {}
    )
  })
});
