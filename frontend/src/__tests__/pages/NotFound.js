import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../pages/NotFound';

describe('Not Found', () => {
  it('Render Correctly', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toMatchSnapshot();
  });
});
