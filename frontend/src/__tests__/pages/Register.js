import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Register from '../../pages/Register';

describe('Register', () => {
  it('Render corrected', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <Register />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
