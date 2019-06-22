import React from 'react';
import { shallow } from 'enzyme';
import Orientation from './Orientation';

describe('<Orientation />', () => {
  test('renders', () => {
    const wrapper = shallow(<Orientation />);
    expect(wrapper).toMatchSnapshot();
  });
});
