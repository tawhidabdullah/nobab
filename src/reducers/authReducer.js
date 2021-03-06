import isEmpty from '../validation/isEmpty';
import {
  SET_CURRENT_USER,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_STARTED,
  GET_ORDERS_FAIL
} from '../actions/types';

const GET_USER_START = 'GET_USER_START';
const GET_USER_COMPLETE = 'GET_USER_COMPLETE';
const GET_USER_FAIL = 'GET_USER_FAIL';

const initialState = {
  isAuthenticate: false,
  isAdmin: false,
  user: {},
  order: {
    isLoading: true,
    orders: []
  },
  isLoading: false
};

// reducer will take 2 argument => actions , initial state

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticate: !isEmpty(action.payload),
        isAdmin: !isEmpty(action.payload.isAdmin),
        user: action.payload
      };
    case GET_ORDERS_STARTED:
      return {
        ...state,
        order: {
          ...state.orders,
          isLoading: true
        }
      };
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        order: {
          ...state.orders,
          isLoading: false,
          orders: action.payload
        }
      };

    case GET_ORDERS_FAIL:
      return {
        ...state,
        order: {
          ...state.orders,
          isLoading: false
        }
      };

    case GET_USER_START:
      return {
        ...state,
        isLoading: true,
        isAuthenticate: false
      };

    case GET_USER_COMPLETE:
      return {
        ...state,
        isAuthenticate: true,
        isLoading: false
      };

    case GET_USER_FAIL:
      return {
        ...state,
        isAuthenticate: false,
        isLoading: false
      };

    default:
      return state;
  }
};

export default authReducer;
