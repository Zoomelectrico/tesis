import React from 'react';
import renderer from 'react-test-renderer';
import Loading from '../../components/loading';

test('Loading render corrently', () => {
  const component = renderer.create(<Loading />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
