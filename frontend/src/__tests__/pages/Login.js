import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../pages/Login';

describe('Login', () => {
  it('Render Correctly', () => {
    const wrapper = shallow(
      <MemoryRouter keyLength={0} initialEntries={['/']}>
        <Login />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
