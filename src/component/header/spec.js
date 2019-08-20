import React from 'react';
import Enzyme, { shallow } from 'enzyme';
// 方便调试
// import Adapter from 'enzyme-adapter-react-16';
// Enzyme.configure({adapter: new Adapter()});

import { findByTestAttr } from '../../../Utils';
import Header from './index';

const setUp = (props={}) => {
  const component = shallow(<Header {...props} />);
  return component;
};

describe('Header Component', () => {
  let component;
  
  beforeEach(() => {
    component = setUp();
  })

  it('Should render without errors', () => {
    const wrapper = findByTestAttr(component, 'headerComponent')
    expect(wrapper.length).toBe(1);
  })

  it('Should render a logo', () => {
    const logo = findByTestAttr(component, 'logoIMG');
    expect(logo.length).toBe(1);
  })
})