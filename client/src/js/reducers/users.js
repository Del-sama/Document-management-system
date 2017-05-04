import * as actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_SUCCESS:
      return { ...state, users: action.users };
    case actionTypes.VIEW_USER:
      return { ...state, user: action.user };
    case actionTypes.USER_UPDATED:
      return Object.assign({}, state, {
        users: [...state.users].map((user) =>
          (user.id === action.user.id) ?
            { ...user, roleId: action.user.roleId } : user)});
    case actionTypes.USER_DELETED:
      return { ...state,
        users: state.users.filter((user) => {
          return user.id !== action.deletedUserId;
        })};
    default:
      return state;
  }
};