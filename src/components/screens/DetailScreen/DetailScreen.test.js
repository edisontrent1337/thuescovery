import React from 'react';
import { shallow } from 'enzyme';
import DetailScreen from './DetailScreen';

describe('<DetailScreen />', () => {
  test('renders', () => {
    const wrapper = shallow(<DetailScreen />);
    expect(wrapper).toMatchSnapshot();
  });
});
