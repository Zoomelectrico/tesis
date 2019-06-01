import React from 'react';
import { shallow } from 'enzyme';
import School from '../../pages/dashboard/postulate/school';

describe('School Component', () => {
  it('Render Correctly', () => {
    const wrapper = shallow(<School save={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
