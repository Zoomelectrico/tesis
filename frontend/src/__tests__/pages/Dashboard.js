import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import Login from '../../pages/Login';

const props = {
  user: {
    firstName: 'Juan',
    privilege: 2,
  },
  update: jest.fn(),
  onChangeUpdate: jest.fn(),
};

describe('Dashboad', () => {
  it('Render Correctly', () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={['/app/dashboard']}>
        <Dashboard {...props} />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('Redirect to Login', () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={['/app/dashboard']}>
        <Dashboard />
      </MemoryRouter>
    );
    console.log(wrapper);
  });
});
