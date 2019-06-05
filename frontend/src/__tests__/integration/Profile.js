import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../../pages/dashboard/Profile';

jest.setTimeout(30000);

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

let container;

describe('Integration Testing: Profile', () => {
  const mockApi = new MockAdapter(axios);
  const mockData = {
    success: true,
    user: {
      _id: '123',
      firstName: 'Jose',
      lastName: 'Quevedo G',
      email: 'jose.quevedo@correo.unimet.edu.ve',
      privilege: 2,
      dni: '27014788',
      carnet: '201611110008',
      major: 'ingenieria-de-sistemas',
      faculty: 'facultad-de-ingenieria',
    },
  };
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    mockApi
      .onPost('https://uvote.tk/api/user-update/123')
      .reply(200, { ...mockData });
  });
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
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
  it('Render Correctly & Ppdate the User', async () => {
    act(() => {
      ReactDOM.render(
        <MemoryRouter initialEntries={['/app/dashboard/profile']} keyLength={0}>
          <Profile {...props} />
        </MemoryRouter>,
        container
      );
    });
    await sleep(5000);
    expect(document.querySelector('#lastName')).toBeTruthy();
    expect(document.querySelector('#lastName').value).toMatch(/Quevedo/);
    document.querySelector('#lastName').value = `Quevedo G`;
    const event = new Event('click');
    document.querySelector('#btnUpdate').dispatchEvent(event);
    expect(document.querySelector('#lastName').value).toMatch(/Quevedo G/);
  });
});
