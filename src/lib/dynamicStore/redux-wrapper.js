import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Logger from '../../utils/logger';

const debug = false;
const DEFAULT_KEY = process.env.STORE_KEY || '__FIL_REDUX_STORE__';

/**
 * @param makeStore
 * @param initialState
 * @param config
 * @return {{getState: function, dispatch: function}}
 */
const initStore = ({ makeStore, initialState, config }) => {
  const { storeKey } = config;

  const createStore = () =>
    makeStore(config.deserializeState(initialState), {
      ...config,
    });

  // Memoize store
  if (!window[storeKey]) {
    window[storeKey] = createStore();
  }

  return window[storeKey];
};

/**
 * @param makeStore
 * @param config
 * @return {function(App): {getInitialProps, new(): WrappedApp, prototype: WrappedApp}}
 */
export default (makeStore, configObj = {}) => {
  const config = {
    storeKey: DEFAULT_KEY,
    debug,
    serializeState: state => state,
    deserializeState: state => state,
    ...configObj,
  };

  return App =>
    class WrappedApp extends Component {
      static displayName = `withRedux(${App.displayName || App.name || 'App'})`;

      constructor(props, context) {
        super(props, context);

        let { store } = props; // eslint-disable-line
        const { initialState } = props; // eslint-disable-line

        const hasStore = store && 'dispatch' in store && 'getState' in store;

        store = hasStore
          ? store
          : initStore({
              makeStore,
              initialState,
              config,
            });

        if (config.debug)
          Logger.log(
            'WrappedApp.render',
            hasStore ? 'picked up existing one,' : 'created new store with',
            'initialState',
            initialState
          );

        this.store = store;
      }

      render() {
        const { initialState, store, ...props } = this.props; // eslint-disable-line
        return (
          <Provider store={this.store}>
            <App {...props} store={this.store} />
          </Provider>
        );
      }
    };
};
