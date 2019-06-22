import React from 'react';
import { shallow } from 'enzyme';
import ARView from './ARView';

describe('<ARView />', () => {
  test('renders', () => {
    const wrapper = shallow(<ARView />);
    expect(wrapper).toMatchSnapshot();
  });
});
