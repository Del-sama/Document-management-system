export default (state = {}, action) => {
  switch(action.type){
    case 'LOGIN_SUCCESSFUL':
      console.log('login succesfull');
      return {...state, user: action.user, token: action.token, error: null, success: action.message}
    case 'LOGIN_ERROR':
      return {...state, error: action.message, success: null, status: "Login failed"}
    default:
      return state;
  }
}
