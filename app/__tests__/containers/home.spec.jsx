import React from 'react';
import { shallow } from 'enzyme';
import { HomeBase } from './../../containers';

describe('<Home />', () => {
  it('should render', () => {
    shallow(<HomeBase />);
  });
});
