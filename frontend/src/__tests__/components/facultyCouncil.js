import React from 'react';
import { shallow } from 'enzyme';
import FacultyCouncil from '../../pages/dashboard/postulate/facultyCouncil';

describe('Faculty Group', () => {
  it('Render Correctly', () => {
    const wrapper = shallow(<FacultyCouncil save={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
