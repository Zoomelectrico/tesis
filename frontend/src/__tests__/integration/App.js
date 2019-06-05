import React from 'react';
import ReactDOM from 'react-dom';
import { mount, render } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { NotFound, Dashboard } from '../../pages';
import DashProfile from '../../pages/dashboard/Profile';

jest.setTimeout(30000);

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

let container;

describe('App Component', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });
  it('Home', async () => {
    act(() => {
      ReactDOM.render(
        <MemoryRouter initialEntries={['/']} keyLength={0}>
          <App />
        </MemoryRouter>,
        container
      );
    });
    await sleep(5000);
    expect(document.querySelector('nav.navbar')).toBeTruthy();
  });
  it('Login', async done => {
    act(() => {
      ReactDOM.render(
        <MemoryRouter initialEntries={['/auth/login']} keyLength={0}>
          <App />
        </MemoryRouter>,
        container
      );
    });
    await sleep(5000);
    expect(document.querySelector('#email')).toBeTruthy();
    expect(document.querySelector('#password')).toBeTruthy();
    expect(document.querySelector('#btnLogin')).toBeTruthy();
    document.querySelector('#email').value =
      'jose.quevedo@correo.unimet.edu.ve';
    document.querySelector('#password').value = '12345678';
    const e = new Event('click');
    document.querySelector('#btnLogin').dispatchEvent(e);
    done();
  });
  it('Dashboard', async done => {
    const props = {
      user: { firstName: '', lastName: '', privilege: 2 },
      history: { push: jest.fn() },
      updateUser: jest.fn(),
      onChangeUser: jest.fn(),
      location: {
        search: '',
      },
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={['/app/dashboard/profile']} keyLength={0}>
        <DashProfile {...props} />
      </MemoryRouter>
    );
    await sleep(5000);
    // wrapper.find('#email').simulate('change', {
    //   target: { name: 'email', value: 'jose.quevedo@correo.unimet.edu.ve' },
    // });
    // wrapper.find('#password').simulate('change', {
    //   target: { name: 'password', value: '12345678' },
    // });
    await sleep(5000);
    done();
  });
  it('Redirect to 404', async () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/random']} keyLength={0}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(NotFound)).toHaveLength(1);
    wrapper.unmount();
  });
});
