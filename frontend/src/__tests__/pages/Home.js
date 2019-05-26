import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Home from '../../pages/Home';

test('Home render corrected', () => {
  const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
      <Home />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
