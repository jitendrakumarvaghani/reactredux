import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';
import nock from 'nock';
import thunk from 'redux-thunk';
import * as actions from './../../actions';
import * as types from '../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ACTIONS', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should get action requestForm', () => {
    const expectedActions = [
      {
        type: types.SHOW_REQUEST_FORM,
      },
    ];
    const store = mockStore({});
    store.dispatch(actions.showRequestForm());
    expect(store.getActions()).to.be.deep.equals(expectedActions);
  });

  it('should get action showHome', () => {
    const expectedActions = [
      {
        type: types.SHOW_HOME,
      },
    ];
    const store = mockStore({});
    store.dispatch(actions.showHome());
    expect(store.getActions()).to.be.deep.equals(expectedActions);
  });

  it('should get action sendStart and requestFulfilled', function() {
    this.timeout(5000);
    nock('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth')
    .post('/', {
      name: 'xxx',
      email: 'xxx',
    })
    .reply(200, {
      body: {
        registered: true,
      },
    });
    const expectedActions = [
      {
        type: types.SEND_REQUEST_START,
      },
      {
        type: types.SEND_REQUEST_FULFILLED,
        payload: 'Registered',
      },
    ];
    const store = mockStore({});
    return store.dispatch(actions.sendRequest({
      name: 'xxx',
      email: 'xxx',
    })).then(() => {
      expect(store.getActions()).to.be.deep.equals(expectedActions);
    });
  });
});
