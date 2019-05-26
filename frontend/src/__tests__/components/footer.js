import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../../components/footer';

test('Footer render corrently', () => {
  const component = renderer.create(<Footer />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
