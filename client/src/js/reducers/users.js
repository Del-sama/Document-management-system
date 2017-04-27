export default function allUsersReducer(state = {}, action) {
  switch (action.type) {
    case 'VIEW_ALL_USERS':
      return { ...state, users: action.users };
    default:
      return state;
  }
}