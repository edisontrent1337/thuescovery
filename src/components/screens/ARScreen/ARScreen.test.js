import React from 'react';
import { shallow } from 'enzyme';
import ARScreen from './ARScreen';

describe('<ARScreen />', () => {
  test('renders', () => {
    const wrapper = shallow(<ARScreen />);
    expect(wrapper).toMatchSnapshot();
  });
});
