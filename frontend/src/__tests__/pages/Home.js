import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../pages/Home';

describe('Home', () => {
  it('Render Corectly', () => {
    const wrapper = shallow(
      <MemoryRouter keyLength={0} initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
  // Probar el form aqui!!
});
