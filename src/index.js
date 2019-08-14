import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import styles from './styles'; // eslint-disable-line no-unused-vars
import App from './App';
import {
  initialiseGlobalSagas,
  initialiseGlobalReducer,
  setApplicationBootStrapActions,
  setGlobalPageTransitionActions,
} from './lib/dynamicStore';

import globalReducers from './global/reducer';
import globalActions, { globalPageTransitionActions } from './global/actions';
import globalSaga from './global/saga';

initialiseGlobalSagas(globalSaga);
initialiseGlobalReducer(globalReducers);
setApplicationBootStrapActions(globalActions);
setGlobalPageTransitionActions(globalPageTransitionActions);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
