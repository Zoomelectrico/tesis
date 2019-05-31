import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../pages/Login';

describe('Login', () => {
  it('Render Correctly', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <Login />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
