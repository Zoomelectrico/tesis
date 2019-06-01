import React from 'react';
import { shallow } from 'enzyme';
import ElectoralGroups from '../../../pages/dashboard/admin/ElectoralGroups';

describe('Electoral Groups', () => {
  it('Render Correctly', () => {
    const wrapper = shallow(<ElectoralGroups />);
    expect(wrapper).toMatchSnapshot();
  });
});
