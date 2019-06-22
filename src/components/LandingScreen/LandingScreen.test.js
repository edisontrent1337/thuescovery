import React from 'react';
import { shallow } from 'enzyme';
import LandingScreen from './LandingScreen';

describe('<LandingScreen />', () => {
  test('renders', () => {
    const wrapper = shallow(<LandingScreen />);
    expect(wrapper).toMatchSnapshot();
  });
});
