import React from 'react';
import { shallow } from 'enzyme';
import Council from '../../pages/dashboard/postulate/council';

describe('Council', () => {
  it('Render Correctly', () => {
    const wrapper = shallow(<Council save={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
