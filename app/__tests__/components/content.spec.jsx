import React from 'react';
import { shallow } from 'enzyme';
import Button from 'react-bootstrap/lib/Button';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Content from './../../components/content';

chai.use(chaiEnzyme());
const sinon = require('sinon');

describe('<Content/>', () => {
  it('should render', () => {
    shallow(<Content />);
  });

  it('should call requestInvite when user click on the requestInvite button', () => {
    const showRequestForm = sinon.spy();
    const wrapper = shallow(
      <Content
        showRequestForm={showRequestForm}
      />,
    );
    const sendButton = wrapper.findWhere(n => n.type() === Button);
    sendButton.simulate('click');
    expect(showRequestForm).to.have.property('callCount', 1);
  });
});
