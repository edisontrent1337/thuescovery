import React from 'react';
import { shallow } from 'enzyme';
import ConnectedApplicationScreen from './ConnectedApplicationScreen';

describe('<ConnectedApplicationScreen />', () => {
  test('renders', () => {
    const wrapper = shallow(<ConnectedApplicationScreen />);
    expect(wrapper).toMatchSnapshot();
  });
});
