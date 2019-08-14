import React from 'react';
import { enhance } from './lib/dynamicStore';
import './App.css';
import HomePage from './containers/templates/HomePage/HomePage';

const App = () => <HomePage />;

export default enhance(App, {
  key: 'app',
});
