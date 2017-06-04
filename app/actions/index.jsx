import axios from 'axios';
import * as actionTypes from './actionTypes';

export function showRequestForm() {
  return {
    type: actionTypes.SHOW_REQUEST_FORM,
  };
}
export function showHome() {
  return {
    type: actionTypes.SHOW_HOME,
  };
}

function sendRequestStart() {
  return {
    type: actionTypes.SEND_REQUEST_START,
  };
}

function sendRequestFulfilled(data) {
  return {
    type: actionTypes.SEND_REQUEST_FULFILLED,
    payload: data,
  };
}

function sendRequestError(e) {
  return {
    type: actionTypes.SEND_REQUEST_ERROR,
    payload: e,
  };
}

export function sendRequest(data) {
  return (dispatch) => {
    const url = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';
    dispatch(sendRequestStart());
    return axios.post(url, data)
      .then((r) => {
        if (r.status === 200) {
          dispatch(sendRequestFulfilled(r.data));
        }
      })
      .catch((e) => {
        const message = e.response.data.errorMessage;
        dispatch(sendRequestError(message));
      });
  };
}
