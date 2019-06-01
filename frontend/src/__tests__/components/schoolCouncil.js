import React from 'react';
import { shallow } from 'enzyme';
import SchoolCouncil from '../../pages/dashboard/postulate/schoolCouncil';

describe('School Council Component', () => {
  it('Render Correctly', () => {
    const wrapper = shallow(<SchoolCouncil save={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
