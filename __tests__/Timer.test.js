//import 'react-native';
import React from 'react';
import { act } from 'react-test-renderer';
import { Timer } from '../Timer';

import renderer from 'react-test-renderer';
jest.setTimeout(15000);

it('renders correctly', () => {
  const tree = renderer.create(<Timer />).toJSON();
  expect(tree).toMatchSnapshot();
  //renderer.create(<Timer />);
  //await act(async () => { expect(tree).toMatchSnapshot(); })
});