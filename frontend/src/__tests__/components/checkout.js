import React from 'react';
import renderer from 'react-test-renderer';
import Checkout from '../../pages/dashboard/postulate/checkout';

describe('Checkout Component', () => {
  test('Checkout render without Props', () => {
    const component = renderer.create(<Checkout />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Checkout render Props', () => {
    const postulation = {
      academicCouncil: {},
      facultyCouncil: [],
      schools: [],
      schoolCouncil: [],
      fce: [],
      sports: [],
      culture: [],
      services: [],
      academic: [],
      responsibility: [],
      passed: 1,
    };
    const component = renderer.create(
      <Checkout postulation={{ ...postulation }} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
