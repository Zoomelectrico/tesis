import React from 'react';
import { shallow } from 'enzyme';
import StudentFederationCenter from '../../pages/dashboard/postulate/federation';

describe('Student Federation Center Component', () => {
  it('Render Correctly', () => {
    const wrapper = shallow(<StudentFederationCenter save={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
