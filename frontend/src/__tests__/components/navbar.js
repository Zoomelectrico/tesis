import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Navbar from '../../components/navbar';

test('Navbar render corrently', () => {
  const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
      <Navbar />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
