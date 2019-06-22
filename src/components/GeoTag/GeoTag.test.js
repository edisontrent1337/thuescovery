import React from 'react';
import { shallow } from 'enzyme';
import GeoTag from './GeoTag';

describe('<GeoTag />', () => {
  test('renders', () => {
    const wrapper = shallow(<GeoTag />);
    expect(wrapper).toMatchSnapshot();
  });
});
