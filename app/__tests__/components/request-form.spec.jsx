import React from 'react';
import { shallow } from 'enzyme';
import RequestForm from './../../components/request-form';

const sinon = require('sinon');

describe('<RequestForm />', () => {
  const showHome = sinon.spy();
  const sendRequest = sinon.spy();
  const request = {
    isFetching: false,
    isFetched: false,
    data: null,
    isFetchingFailed: false,
    message: '',
  };
  it('should render', () => {
    shallow(
      <RequestForm
        showHome={showHome}
        sendRequest={sendRequest}
        request={request}
      />);
  });
});
