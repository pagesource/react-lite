// @flow

import type { Node } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reduxWrapper from './redux-wrapper';
import createReducer from './reducers';
import { trackingMiddleware } from '../../utils/analytics/trackingMiddleware';
import type { TrackerObject } from '../../utils/analytics/types';
import { getTracker } from '../../utils/analytics/helpers/initTracker';

const tracker: TrackerObject = getTracker();

const sagaMiddleware = createSagaMiddleware();
const middlewares: Array<Function> = [sagaMiddleware, trackingMiddleware(tracker)];
const enhancers: Array<Function> = [applyMiddleware(...middlewares)];

// Choose compose method depending upon environment and platform
const composeEnhancers =
  process.env.NODE_ENV !== 'production' && typeof window === 'object'
    ? composeWithDevTools
    : compose;

let globalSaga;

/**
 * This utility set global saga of application
 * @param {Function} sagas
 */
export const initialiseGlobalSagas = (sagas: Function) => {
  globalSaga = sagas;
};

/**
 * Create redux store with the middlewares and enhancers
 *
 * @param {Object} options
 * @param {Object} options.key - Unique key to recognize the page component
 * @param {Object} options.reducer - Reducers associated with the page component
 * @param {Object} options.saga - Sagas associated with the page component
 */
export default (options: Object) => (BaseComponent: Node): Node => {
  const hasKey = !!options.key;
  // $FlowFixMe eslint-disablie-line
  if (!hasKey) throw new Error(`${BaseComponent.displayName} needs to be passed with a key`);
  const hasReducer = !!options.reducer;
  const hasSaga = !!options.saga;
  const reducer = hasKey && hasReducer ? { [options.key]: options.reducer } : {};

  const configureStore = (initialState = {}) => {
    const store = createStore(createReducer(reducer), initialState, composeEnhancers(...enhancers));
    // Keep access to 'run' method of saga task in store so thats its available globally with store
    // $FlowFixMe eslint-disablie-line
    store.runSaga = sagaMiddleware.run;
    // Keep record of reducer injected in store associated with unique key
    // $FlowFixMe eslint-disablie-line
    store.injectedReducers = reducer;
    if (globalSaga) {
      // Run global saga and keep the task returned by running saga to access later while cancelling
      // $FlowFixMe eslint-disablie-line
      store.globalSaga = { globalSaga, task: store.runSaga(globalSaga) };
    }
    // Keep record of saga injected in store associated with unique key
    // $FlowFixMe eslint-disablie-line
    store.injectedSagas = {};
    if (hasSaga) {
      // Run saga and keep the task returned by running saga to access later while cancelling.
      // $FlowFixMe eslint-disablie-line
      debugger; // eslint-disable-line
      store.injectedSagas[options.key] = { ...options.saga, task: store.runSaga(options.saga) };
    }
    return store;
  };

  return reduxWrapper(configureStore)(BaseComponent);
};
