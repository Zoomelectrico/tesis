import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import NavbarAdmin from '../../components/navbarAdmin';

test('Navbar Admin render corrently', () => {
  const props = {
    brandName: 'uvote',
    user: {
      firstName: 'Jose',
      lastName: 'Quevedo',
      img: 'https://via.placeholder.com/150',
    },
    logout: x => x,
  };
  const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
      <NavbarAdmin {...props} />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
