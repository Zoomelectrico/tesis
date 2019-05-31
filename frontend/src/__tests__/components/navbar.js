import React from 'react';
import { shallow } from 'enzyme';
import Navbar from '../../components/navbar';

describe('Navbar', () => {
  it('Render Corrently', () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper).toMatchSnapshot();
  });
});
