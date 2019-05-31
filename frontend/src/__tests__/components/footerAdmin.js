import React from 'react';
import { shallow } from 'enzyme';
import FooterAdmin from '../../components/footerAdmin';

describe('Footer Admin', () => {
  it('Render Corrently', () => {
    const wrapper = shallow(<FooterAdmin />);
    expect(wrapper).toMatchSnapshot();
  });
});
