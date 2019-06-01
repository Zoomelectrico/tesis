import React from 'react';
import { shallow } from 'enzyme';
import Postulations from '../../../pages/dashboard/admin/Postulations';

describe('Electoral Groups', () => {
  it('Render Correctly', () => {
    const wrapper = shallow(<Postulations />);
    expect(wrapper).toMatchSnapshot();
  });
});
