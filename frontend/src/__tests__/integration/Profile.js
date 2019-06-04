import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../../pages/dashboard/Profile';

jest.setTimeout(30000);

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

describe('Integration Testing: Profile', () => {
  const mockApi = new MockAdapter(axios);
  const mockData = {
    success: true,
    user: {
      _id: '123',
      firstName: 'Jose',
      lastName: 'Quevedo',
      email: 'jose.quevedo@correo.unimet.edu.ve',
      privilege: 2,
      dni: '27014788',
      carnet: '201611110008',
      major: 'ingenieria-de-sistemas',
      faculty: 'facultad-de-ingenieria',
    },
  };
  beforeEach(() => {
    mockApi
      .onPost('https://uvote.tk/api/user-update/123')
      .replay(200, { ...mockData });
  });
  const props = {
    user: {
      _id: '123',
      firstName: 'Jose',
      lastName: 'Quevedo',
      email: 'jose.quevedo@correo.unimet.edu.ve',
      privilege: 2,
      dni: '27014788',
    },
    updateUser: jest.fn(),
    location: {
      search: {},
    },
  };
  it('Render Correctly', async () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/app/dashboard/profile']} keyLength={0}>
        <Profile {...props} />
      </MemoryRouter>
    );
    await sleep(5000);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
  it('Update the user', () => {
    // const wrapper = shallow(
    //   <MemoryRouter initialEntries={['/app/dashboard/profile']} keyLength={0}>
    //     <Profile {...props} />
    //   </MemoryRouter>
    // );
    // mockApi.onPost('https://uvote/api/user-update/123').reply(200, {
    //   data: mockData,
    // });
    // wrapper.find('#btnUpdate').simulate('click');
    // expect(props.updateUser).toHaveBeenCalled();
    // expect(wrapper.props().carnet).toBe('20161111008');
  });
});
