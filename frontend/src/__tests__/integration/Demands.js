import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-test-renderer';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Demand from '../../pages/dashboard/Demands';

const props = {
  location: {
    search: {},
  },
};

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

describe('Demands', () => {
  let container;

  beforeEach(() => {
    const api = axios.create({
      baseURL: 'https://uvote.tk/api',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization:
          'Bearer Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZGMzMjUwOTY5YWIwNmEyNjE0MjQ3YSIsImlhdCI6MTU1OTUyNjE3NH0.mG1NDsJSpUdPkJuQOUNIj2R0kZTGAc2f9nFd5S4a6rc',
      },
    });
    const mock = new MockAdapter(api);
    mock.onGet('https://uvote.tk/api/demands').reply(200, {
      sucess: true,
      demands: {
        representative: [
          {
            code: 1,
            _id: 1,
            user: { firstName: '1', lastName: '1', _id: 2 },
          },
        ],
        group: [
          {
            code: 1,
            _id: '1',
            user: { firstName: '2', lastName: '2' },
            electoralGroup: { denomination: '1' },
          },
        ],
        postulation: [],
        complain: [],
      },
    });
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('Fetch the data and render', async () => {
    act(() => {
      ReactDOM.render(<Demand {...props} />, container);
    });
    await sleep(5000);
    console.log(document.body.innerHTML);

    // expect(wrapper.find('table')).toHaveLength(4);
  });
});
