import {
  SHOW_REQUEST_FORM,
  SHOW_HOME,
  SEND_REQUEST_START,
  SEND_REQUEST_ERROR,
  SEND_REQUEST_FULFILLED,
} from './../actions/actionTypes';

const initialState = {
  currentScreen: 'home',
  request: {
    isFetching: false,
    isFetched: false,
    data: null,
    isFetchingFailed: false,
    message: '',
  },
};
export default function invite(state = initialState, action) {
  switch (action.type) {
    case SHOW_REQUEST_FORM:
      return Object.assign({}, initialState, {
        currentScreen: 'requestform',
      });
    case SHOW_HOME:
      return Object.assign({}, initialState, {
        currentScreen: 'home',
        request: {
          isFetching: false,
          isFetched: false,
          data: null,
          isFetchingFailed: false,
          message: '',
        },
      });
    case SEND_REQUEST_START:
      return Object.assign({}, initialState, {
        currentScreen: 'requestform',
        request: {
          isFetching: true,
          isFetched: false,
          data: null,
          isFetchingFailed: false,
          message: '',
        },
      });
    case SEND_REQUEST_FULFILLED:
      return Object.assign({}, initialState, {
        currentScreen: 'response',
        request: {
          isFetching: false,
          isFetched: true,
          isFetchingFailed: false,
          data: action.payload,
          message: '',
        },
      });
    case SEND_REQUEST_ERROR: {
      return Object.assign({}, initialState, {
        currentScreen: 'requestform',
        request: {
          isFetching: false,
          isFetched: false,
          data: null,
          isFetchingFailed: true,
          message: action.payload,
        },
      });
    }
    default:
      return state;
  }
}
