// @flow

import invariant from 'invariant';

import checkStore from './checkStore';
import createReducer from './reducers';
import type { getInjectorsType, StoreType } from './types';

/**
 * Factory function for injecting reducers
 * @param {Object} store
 * @param {boolean} isValid - Prechecked if store is valid
 * @returns {function}
 * @private
 */
export function injectReducerFactory(store: StoreType, isValid: boolean): Function {
  /**
   * @function injectReducer
   * @param {string} key - Unique key saga
   * @param {Object} reducer
   * @private
   */
  function injectReducer(key: string, reducer: Function) {
    if (!isValid) checkStore(store);

    invariant(
      typeof key === 'string' && key && typeof reducer === 'function',
      'reducerInjector.js: Expected `reducer` to be a reducer function'
    );

    // Check `store.injectedReducers[key] === reducer` for hot
    // reloading when a key is the same but a reducer is different
    if (
      Object.prototype.hasOwnProperty.call(store.injectedReducers, key) &&
      store.injectedReducers[key] === reducer
    ) {
      return;
    }

    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.injectedReducers));
  }
  return injectReducer;
}

/**
 * Function for returning reducer injector
 * @param {Object} store
 * @returns {ReducerInjectors}
 * @private
 */
export default function getInjectors(store: Object): getInjectorsType {
  checkStore(store);

  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
