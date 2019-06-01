describe('Profile', () => {
  it('Render Correctly', () => {});
});

// import React from 'react';
// import { shallow } from 'enzyme';
// import axios from 'axios';
// import mockAdapter from 'axios-mock-adapter';
// import { MemoryRouter } from 'react-router-dom';
// import Profile from '../../pages/dashboard/Profile';

// describe('Integration Testing: Profile', () => {
//   // eslint-disable-next-line new-cap
//   const mockApi = new mockAdapter(axios);
//   const mockData = {
//     success: true,
//     user: {
//       _id: '123',
//       firstName: 'Jose',
//       lastName: 'Quevedo',
//       email: 'jose.quevedo@correo.unimet.edu.ve',
//       privilege: 2,
//       dni: '27014788',
//       carnet: '201611110008',
//       major: 'ingenieria-de-sistemas',
//       faculty: 'facultad-de-ingenieria',
//     },
//   };
//   const props = {
//     user: {
//       _id: '123',
//       firstName: 'Jose',
//       lastName: 'Quevedo',
//       email: 'jose.quevedo@correo.unimet.edu.ve',
//       privilege: 2,
//       dni: '27014788',
//     },
//     updateUser: jest.fn(),
//     location: {
//       search: {},
//     },
//   };
//   it('Render Correctly', () => {
//     const wrapper = shallow(
//       <MemoryRouter initialEntries={['/app/dashboard/profile']} keyLength={0}>
//         <Profile {...props} />
//       </MemoryRouter>
//     );
//     expect(wrapper).toMatchSnapshot();
//   });
//   it('Update the user', () => {
//     const wrapper = shallow(
//       <MemoryRouter initialEntries={['/app/dashboard/profile']} keyLength={0}>
//         <Profile {...props} />
//       </MemoryRouter>
//     );
//     mockApi.onPost('https://uvote/api/user-update/123').reply(200, {
//       data: mockData,
//     });
//     wrapper.find('#btnUpdate').simulate('click');
//     expect(props.updateUser).toHaveBeenCalled();
//     expect(wrapper.props().carnet).toBe('20161111008');
//   });
// });
