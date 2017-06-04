import React from 'react';
import { shallow } from 'enzyme';
import Footer from './../../components/footer';

describe('<Footer/>', () => {
  it('should render', () => {
    shallow(<Footer />);
  });
});
