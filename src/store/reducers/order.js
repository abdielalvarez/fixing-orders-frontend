import { GET_ORDER, UPDATE_ORDER } from "../actions/order";

const initialState = {
  orders: []
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        orders: action.data
      }
    case UPDATE_ORDER:
      return {
        ...state,
        orders: action.data
      }
    default:
      return state;
  }
}