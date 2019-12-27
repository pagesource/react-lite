import React from 'react';
import { shallow } from 'enzyme';

import MockProvider from '../../../../../__mocks__/mockProvider';

import Header from '../index';

const editorialData = {
  title: 'Test Title',
  banner: 'Test Banner',
};

describe('Header component', () => {
  test('should render correctly', () => {
    const HeaderComponent = shallow(
      <MockProvider>
        <Header editorialData={editorialData} />
      </MockProvider>
    );
    expect(HeaderComponent).toMatchSnapshot();
  });
});
