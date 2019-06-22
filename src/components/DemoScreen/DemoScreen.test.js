import React from 'react';
import { shallow } from 'enzyme';
import DemoScreen from './DemoScreen';

describe('<DemoScreen />', () => {
  test('renders', () => {
    const wrapper = shallow(<DemoScreen />);
    expect(wrapper).toMatchSnapshot();
  });
});
