import * as actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_SUCCESS:
      return { ...state, users: action.users, pageCount: action.pageCount};
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
    case actionTypes.SEARCH_USER_COMPLETE:
      return { ...state, search: action.users, status: action.status };
    case actionTypes.SEARCH_USER_FAILED:
      return { ...state, status: action.status };
    default:
      return state;
  }
};