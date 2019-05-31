import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../../components/loading';

describe('Loading', () => {
  it('Render Corrently', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper).toMatchSnapshot();
  });
});
