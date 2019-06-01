import React from 'react';
import { shallow } from 'enzyme';
import Postulation from '../../../pages/dashboard/admin/Postulation';

describe('Electoral Groups', () => {
  it('Render Correctly', () => {
    const wrapper = shallow(<Postulation />);
    expect(wrapper).toMatchSnapshot();
  });
});
