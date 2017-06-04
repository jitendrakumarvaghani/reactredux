import React from 'react';
import { shallow } from 'enzyme';
import Button from 'react-bootstrap/lib/Button';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Reponse from './../../components/response';

chai.use(chaiEnzyme());
const sinon = require('sinon');

describe('<Reponse/>', () => {
  it('should render', () => {
    shallow(<Reponse />);
  });
  it('should call ok when user clicks on the ok button', () => {
    const showHome = sinon.spy();
    const wrapper = shallow(
      <Reponse
        showHome={showHome}
      />,
    );
    const sendButton = wrapper.findWhere(n => n.type() === Button);
    sendButton.simulate('click');
    expect(showHome).to.have.property('callCount', 1);
  });
});
