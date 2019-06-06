import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import DashPostulate from '../../pages/dashboard/Postulate';
import { env } from '../../utils';

jest.setTimeout(30000);

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

localStorage.setItem(
  env.KEY,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjZmNDdmMGEyNjkwZDJkNmJlOGMxMyIsImlhdCI6MTU1OTc1MzExNn0.zpf02FESs4HR-RSpJhoD7CX-Y3VNx8e-mOt2qJ8PQns'
);

localStorage.setItem(
  env.USER,
  JSON.stringify({
    _id: '123',
  })
);

let container;

const props = {
  history: {
    push: jest.fn(),
  },
};

const mockApi = new MockAdapter(axios);

describe('Integration Testing: ElectoralGroup', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('Render Electoral Group Form', async () => {
    mockApi.onGet('https://uvote.tk/api/electoral-group/123').reply(200, {
      success: true,
      electoralGroup: null,
    });
    act(() => {
      ReactDOM.render(
        <MemoryRouter
          initialEntries={['/app/dashboard/postulate']}
          keyLength={0}
        >
          <DashPostulate {...props} />
        </MemoryRouter>,
        container
      );
    });
    await sleep(5000);
    expect(document.querySelector('#denomination')).toBeTruthy();
    expect(document.querySelector('#number')).toBeTruthy();
    expect(document.querySelector('#colorName')).toBeTruthy();
    expect(document.querySelector('#colorHex')).toBeTruthy();
  });

  it('Render waiting message', async () => {
    mockApi.onGet('https://uvote.tk/api/electoral-group/123').reply(200, {
      success: true,
      electoralGroup: {
        _id: '234',
        denomination: 'A',
        logo: '',
        number: 12,
        color: 'Gris',
        colorHex: '#333',
        representative: {
          firstName: '',
          lastName: '',
        },
      },
    });
    act(() => {
      ReactDOM.render(
        <MemoryRouter
          initialEntries={['/app/dashboard/postulate']}
          keyLength={0}
        >
          <DashPostulate {...props} />
        </MemoryRouter>,
        container
      );
    });
    await sleep(5000);
    expect(document.querySelector('#wait-message')).toBeTruthy();
  });

  it('Render the Postulation Form', async () => {
    mockApi.onGet('https://uvote.tk/api/electoral-group/123').reply(200, {
      success: true,
      electoralGroup: {
        _id: '234',
        denomination: 'A',
        logo: '',
        number: 12,
        color: 'Gris',
        colorHex: '#333',
        accepted: 1,
        representative: {
          firstName: '',
          lastName: '',
        },
      },
    });

    act(() => {
      ReactDOM.render(
        <MemoryRouter
          initialEntries={['/app/dashboard/postulate']}
          keyLength={0}
        >
          <DashPostulate {...props} />
        </MemoryRouter>,
        container
      );
    });
    await sleep(5000);
    expect(document.querySelector('#school')).toBeTruthy();
    expect(document.querySelector('#school-council')).toBeTruthy();
    expect(document.querySelector('#faculty-council')).toBeTruthy();
    expect(document.querySelector('#academic-council')).toBeTruthy();
    expect(document.querySelector('#fce')).toBeTruthy();
  });
});
