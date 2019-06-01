import React from 'react';
import { shallow } from 'enzyme';
import ElectoralGroup from '../../pages/dashboard/postulate/electoralGroup';

describe('Electoral Group', () => {
  it('Render Correctly', () => {
    const wrapper = shallow(<ElectoralGroup save={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
