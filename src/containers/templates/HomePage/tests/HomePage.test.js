import React from 'react';
import { shallow } from 'enzyme';
import MockProvider from '../../../../../__mocks__/mockProvider';

import HomePage from '../index';

const editorialData = {
  title: 'Test Title',
  banner: 'Test Banner',
};

describe('HomePage component', () => {
  test('should render correctly', () => {
    const HomePageComponent = shallow(
      <MockProvider>
        <HomePage editorialData={editorialData} />
      </MockProvider>
    );
    expect(HomePageComponent).toMatchSnapshot();
  });
});
