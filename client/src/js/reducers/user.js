export default (state = {}, action) => {
  switch(action.type){
    case 'LOGIN_START':
      return {...state, status: 'pending' }
    case 'LOGIN_SUCCESS':
      return {...state, status: 'success' }
    case 'LOGIN_FAILED':
      return {...state, status: 'failed' }
    default:
      return state;
  }
}