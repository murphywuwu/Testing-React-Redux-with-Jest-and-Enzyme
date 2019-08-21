import React from 'react'
import { shallow } from 'enzyme'
import Headline from './index';
import checkPropTypes from 'check-prop-types';

import { findByTestAttr } from '../../../Utils'

const setUp = (props={}) => {
  const component = shallow(<Headline {...props}/>)

  return component;
}

describe('Headline Component', () => {

  describe('Checking PropTypes', () => {
    it('Should not throw a warning', () => {
      const expectdProps = {
        header: 'Test  Header',
        desc: 'Test Desc'
      }

      const propsErr = checkPropTypes(Headline.propTypes, expectdProps, 'props', Headline.name)
      expect(propsErr).toBeUndefined();
    })
  })

  describe('Have props', () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        header: 'Test Header',
        desc: 'Test Desc',
      }
      wrapper = setUp(props)
    })

    it('Should render without errors', () => {
      const component = findByTestAttr(wrapper, 'HeadlineComponent');
      expect(component.length).toBe(1);
    })
  
    it ('Should render a H1', () => {
      const h1 = findByTestAttr(wrapper, 'header');
      expect(h1.length).toBe(1)
    })
  
    it('Should render a desc', () => {
      const desc = findByTestAttr(wrapper, 'desc');
      expect(desc.length).toBe(1)
    })
  })

  describe('Have NO props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setUp();
    })

    it('Should not render', () => {
      const component = findByTestAttr(wrapper, 'HeadlineComponent');
      expect(component.length).toBe(0)
    })
  })

})