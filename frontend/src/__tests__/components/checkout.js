import React from 'react';
import { shallow } from 'enzyme';
import Checkout from '../../pages/dashboard/postulate/checkout';

describe('Checkout Component', () => {
  it('Render without props', () => {
    const wrapper = shallow(<Checkout />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Render With Props', () => {
    const postulation = {
      academicCouncil: {
        dni: 'a',
        name: '1',
        email: 'a@b.com',
      },
      facultyCouncil: [
        {
          dni: '2',
          name: 'b',
          faculty: 'f-a',
        },
      ],
      schools: [
        {
          dni: '3',
          name: 'c',
          charge: 'c-a',
          school: 'e-a',
        },
      ],
      schoolCouncil: [
        {
          dni: '4',
          name: 'd',
          school: 'e-b',
        },
      ],
      fce: [
        {
          name: 'f',
          charge: 'c-b',
          dni: '5',
        },
      ],
      sports: [
        {
          name: 'a',
          dni: '11',
        },
      ],
      culture: [
        {
          name: 'b',
          dni: '12',
        },
      ],
      services: [
        {
          name: 'c',
          dni: '13',
        },
      ],
      academic: [
        {
          name: 'd',
          dni: '14',
        },
      ],
      responsibility: [
        {
          name: 'e',
          dni: '15',
        },
      ],
      passed: 1,
    };
    const wrapper = shallow(<Checkout postulation={{ ...postulation }} />);
    expect(wrapper).toMatchSnapshot();
  });
});
