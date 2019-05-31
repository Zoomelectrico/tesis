import React from 'react';
import { shallow } from 'enzyme';
import NavbarAdmin from '../../components/navbarAdmin';

describe('Admin Navbar', () => {
  it('Render Corrently', () => {
    const props = {
      brandName: 'uvote',
      user: {
        firstName: 'Jose',
        lastName: 'Quevedo',
        img: 'https://via.placeholder.com/150',
      },
      logout: x => x,
    };
    const wrapper = shallow(<NavbarAdmin {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
