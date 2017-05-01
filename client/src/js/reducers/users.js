import * as actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_SUCCESS:
      return { ...state, users: action.users };
    case actionTypes.VIEW_USER:
      return { ...state, user: action.user };
    case actionTypes.USER_UPDATED:
      const userToUpdate = state.users.find(user => userId === action.userId);
      const userIndex = state.users.indexOf(userToUpdate);
      const newUsers = state.users.slice();
      newUsers[userIndex] = Object.assign({}, newUsers[userIndex], action.user);
      return { ...state, users: newUsers };
    case actionTypes.USER_DELETED:
      return { ...state,
        documents: state.users.filter((user) => {
          return userId !== action.userId;
        })};
    default:
      return state;
  }
};