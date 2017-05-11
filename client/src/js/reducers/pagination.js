import * as types from '../actions/actionTypes';

export default function documents(state = {}, action = {}) {
  switch (action.type) {
    case actionTypes.PAGINATE:
      return action.pagination;
    default: return state;
  }
}