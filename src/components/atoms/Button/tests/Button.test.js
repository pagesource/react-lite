import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Button from '../index';

configure({ adapter: new Adapter() });

describe('<Button />', () => {
  let ButtonComponent = '';
  beforeEach(() => {
    ButtonComponent = shallow(<Button>Test</Button>);
  });

  test('should render correctly', () => {
    expect(ButtonComponent).toMatchSnapshot();
  });
});
