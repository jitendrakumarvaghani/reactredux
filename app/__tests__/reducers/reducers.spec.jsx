import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import reducer from './../../reducers/invite-reducer';

import * as types from '../../actions/actionTypes';

describe('REDUCERS', () => {
  let initialState = null;
  before(() => {
    initialState = reducer(undefined, {
      currentScreen: 'home',
      request: {
        isFetching: false,
        isFetched: false,
        data: null,
        isFetchingFailed: false,
        message: '',
      },
    });
  });
  it('should change stage to gohome', () => {
    const action = {
      type: types.SHOW_HOME,
    };
    const expectedState = {
      currentScreen: 'home',
      request: {
        isFetching: false,
        isFetched: false,
        data: null,
        isFetchingFailed: false,
        message: '',
      },
    };
    const newState = deepFreeze(reducer(initialState, action));
    expect(newState).to.be.deep.equals(expectedState);
  });

  it('should change stage to showrequest', () => {
    const action = {
      type: types.SHOW_REQUEST_FORM,
    };
    const expectedState = {
      currentScreen: 'requestform',
      request: {
        isFetching: false,
        isFetched: false,
        data: null,
        isFetchingFailed: false,
        message: '',
      },
    };
    const newState = deepFreeze(reducer(initialState, action));
    console.log(newState);
    expect(newState).to.be.deep.equals(expectedState);
  });

  it('should change stage to request sending', () => {
    const action = {
      type: types.SEND_REQUEST_START,
    };
    const expectedState = {
      currentScreen: 'requestform',
      request: {
        isFetching: true,
        isFetched: false,
        data: null,
        isFetchingFailed: false,
        message: '',
      },
    };
    const newState = deepFreeze(reducer(initialState, action));
    expect(newState).to.be.deep.equals(expectedState);
  });

  it('should change stage to request error', () => {
    const action = {
      type: types.SEND_REQUEST_ERROR,
    };
    const expectedState = {
      currentScreen: 'requestform',
      request: {
        isFetching: false,
        isFetched: false,
        data: null,
        isFetchingFailed: true,
        message: undefined,
      },
    };
    const newState = deepFreeze(reducer(initialState, action));
    expect(newState).to.be.deep.equals(expectedState);
  });

  it('should change stage to request fulfilled', () => {
    const action = {
      type: types.SEND_REQUEST_FULFILLED,
      payload: {
        message: 'success',
      },
    };
    const expectedState = {
      currentScreen: 'response',
      request: {
        isFetching: false,
        isFetched: true,
        data: {
          message: 'success',
        },
        isFetchingFailed: false,
        message: '',
      },
    };
    const newState = deepFreeze(reducer(initialState, action));
    expect(newState).to.be.deep.equals(expectedState);
  });
});
