import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Cards from '../components/Cards';

describe('A suite', function() {
  it('should render without throwin g an error', function() {
    const wrapper = shallow(<Cards/>)
    
    expect(wrapper.props().item.name).to.equal('Test character')

  });
});
