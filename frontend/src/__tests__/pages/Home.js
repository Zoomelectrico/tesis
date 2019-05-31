import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../pages/Home';

describe('Home', () => {
  it('Render Corectly', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
  // Probar el form aqui!!
});
