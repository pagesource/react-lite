import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MockProvider from '../__mocks__/mockProvider';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MockProvider>
      <App />
    </MockProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
