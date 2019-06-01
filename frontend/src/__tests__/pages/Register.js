import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Register from '../../pages/Register';

describe('Register', () => {
  it('Render corrected', () => {
    const wrapper = shallow(
      <MemoryRouter keyLength={0} initialEntries={['/']}>
        <Register />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
