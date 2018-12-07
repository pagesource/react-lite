import { createStore } from 'redux';
/* eslint-disable import/no-extraneous-dependencies */
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

export default function configureStore() {
  return createStore(rootReducer, composeWithDevTools());
}
