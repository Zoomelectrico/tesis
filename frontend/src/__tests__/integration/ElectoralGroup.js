import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import ElectoralGroup from '../../pages/dashboard/admin/ElectoralGroup';
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

let container;

describe('Integration Testing: ElectoralGroup', () => {
  const mockApi = new MockAdapter(axios);
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    mockApi.onGet('https://uvote.tk/api/demand/123').reply(200, {
      success: true,
      demand: {
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
      },
    });
    mockApi
      .onPost('https://uvote.tk/api/demand-accept-eg')
      .reply(200, { success: true });
  });
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });
  const props = {
    location: {
      search: '?id=123',
    },
    history: {
      push: jest.fn(),
    },
  };
  it('Render Correctly & Ppdate the User', async () => {
    act(() => {
      ReactDOM.render(
        <MemoryRouter
          initialEntries={['/app/dashboard/electoral-group?id=123']}
          keyLength={0}
        >
          <ElectoralGroup {...props} />
        </MemoryRouter>,
        container
      );
    });
    await sleep(15000);
    expect(document.querySelector('.btn.btn-success')).toBeTruthy();
    expect(document.querySelector('.btn.btn-success').dataset.id).toMatch(
      /123/
    );
    expect(document.querySelector('.btn.btn-success').dataset.egid).toMatch(
      /234/
    );
  });
});
