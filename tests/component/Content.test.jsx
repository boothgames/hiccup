import { shallow } from 'enzyme';
import React from 'react';
import Content from '../../src/component/Content/Content';

describe('Content', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<Content />);
    expect(wrapper).toMatchSnapshot();
  });
});
