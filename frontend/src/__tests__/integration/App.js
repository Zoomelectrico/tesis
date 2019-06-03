import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { NotFound } from '../../pages';

describe('App Component', () => {
  it('Redirect to 404', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/random']} keyLength={0}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(NotFound)).toHaveLength(1);
    wrapper.unmount();
  });
});
