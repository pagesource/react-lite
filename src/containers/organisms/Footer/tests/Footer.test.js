import React from 'react';
import { shallow } from 'enzyme';

import MockProvider from '../../../../../__mocks__/mockProvider';

import Footer from '../index';

describe('Footer component', () => {
  test('should render correctly', () => {
    const FooterComponent = shallow(
      <MockProvider>
        <Footer />
      </MockProvider>
    );
    expect(FooterComponent).toMatchSnapshot();
  });
});
