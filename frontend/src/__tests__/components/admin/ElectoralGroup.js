import React from 'react';
import { shallow } from 'enzyme';
import ElectoralGroup from '../../../pages/dashboard/admin/ElectoralGroup';

describe('Electoral Group', () => {
  it('Render Correctly', () => {
    const wrapper = shallow(<ElectoralGroup />);
    expect(wrapper).toMatchSnapshot();
  });
});
