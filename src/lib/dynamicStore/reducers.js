// @flow

import { combineReducers } from 'redux';

let globalReducer = (state = {}) => state;

/**
 * This function sets the global reducer of the application
 * @param {Function} reducer
 */
export const initialiseGlobalReducer = (reducer: Function) => {
  globalReducer = reducer;
};

/**
 * @function createReducer - Combine reducer for given page level component with global ones
 * @param {Object} injectedReducers
 * @returns {function}
 */
export default function createReducer(injectedReducers: Object) {
  return combineReducers({
    global: globalReducer,
    ...injectedReducers,
  });
}

export const globalDataStructure = ['global'];
