import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/footer';

describe('Footer', () => {
  it('Render Corrently', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });
});
