// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import get from 'lodash/get';
import hoistNonReactStatic from 'hoist-non-react-statics';
import type { Node } from 'react';
import type { RouterHistory } from 'react-router-dom';

import initRedux from './configureStore';
import monitorSagas from './monitorSagas';
import injectSagaAndReducer from './injectSagaAndReducer';
import logger from '../../utils/logger';

import type {
  EnhanceConfigType,
  ClientDispatchActionsType,
  StoreType,
  NextComponentType,
  ActionType,
  Props,
  State,
} from './types';

let applicationBootstrapActions = [];
let globalPageTransitionActions = [];
let areBootStrapActionsTriggered = false;
let errorPage = '';

export const setGlobalErrorPage = (page: string) => {
  errorPage = page;
};

export const setApplicationBootStrapActions = (actions: ActionType) => {
  if (Array.isArray(actions)) {
    applicationBootstrapActions = actions;
  } else {
    applicationBootstrapActions.push(actions);
  }
};

export const setGlobalPageTransitionActions = (actions: Array<Function>) => {
  globalPageTransitionActions = actions;
};

// This variable is set once when the routeComponent has been transition once
let currentPath;

// It makes sure that Data is not fetched more than once, if route has already been transitioned to before
const initialActionsTriggered = {};

export const getWrapperComponent = (
  WrappedComponent: any,
  {
    key,
    reducer,
    saga,
    initialActions = [],
    criticalState,
    fireActionsOnEachMount = false,
  }: EnhanceConfigType
) =>
  class WrapperComponent extends Component<Props, State> {
    /**
     * Method to validate if critical data required for the page is present based on which
     * page is rendered or user redirected to an error page
     *
     * @param {Object} storeStruct Structure of the critical data required for page
     * @param {Object} store Redux store of the application
     */
    static validatePageData(
      storeStruct: Array<string> | void,
      store: StoreType,
      history: RouterHistory
    ): void {
      if (storeStruct && storeStruct.length > 0) {
        const currentState: Object = store.getState();
        const missingDataList = [];

        [...storeStruct].forEach(requiredDataPath => {
          if (!get(currentState, requiredDataPath)) {
            missingDataList.push(requiredDataPath);
          }
        });

        if (missingDataList.length > 0) {
          logger.error(
            // $FlowFixMe eslint-disable-line
            `${WrapperComponent.displayName} - Component failed to receive critical data`,
            JSON.stringify(missingDataList)
          );
          if (errorPage) {
            history.replace(errorPage);
          }
        }
      }
    }

    /**
     * Method to dispatch all page level actions provided to the "enhance" method
     *
     * @param {Array} param.actions Array of action objects at page level
     * @param {Object} param.store Redux store object
     * @param {boolean} param.needQuery Flag to indicate if the actions need the query params
     * @param {Object} param.query Query params of the incoming request
     */
    static dispatchActions({ actions, store, extraProps }: ClientDispatchActionsType) {
      actions.map(action =>
        store.dispatch(
          typeof action === 'function'
            ? { ...action(extraProps) }
            : // $FlowFixMe eslint-disable-line
              { ...action }
        )
      );
    }

    state = { isLoading: true };

    sagaPromise = null;

    componentDidMount() {
      const { store, history, ...extraProps } = this.props;
      if (!initialActionsTriggered[key]) {
        injectSagaAndReducer(key, store, saga, reducer);

        this.sagaPromise = monitorSagas(store);
        this.sagaPromise.promise.then(
          () => {
            WrapperComponent.validatePageData(criticalState, store, history);
            this.setState({ isLoading: false });
            if (!initialActionsTriggered[key]) {
              WrapperComponent.dispatchActions({
                actions: !areBootStrapActionsTriggered
                  ? [...applicationBootstrapActions, ...initialActions]
                  : [...initialActions],
                store,
                extraProps,
              });
            }

            initialActionsTriggered[key] = true;
            areBootStrapActionsTriggered = true;
          },
          () => {
            logger.info('PromiseSaga has been rejected');
          }
        );
      } else if (initialActionsTriggered[key] && fireActionsOnEachMount) {
        injectSagaAndReducer(key, store, saga);
        this.sagaPromise = monitorSagas(store);
        this.sagaPromise.promise.then(
          () => {
            WrapperComponent.dispatchActions({
              actions: [...initialActions],
              store,
              extraProps,
            });
          },
          () => {
            logger.info('PromiseSaga has been rejected on remount');
          }
        );
      } else {
        // restart the saga
        injectSagaAndReducer(key, store, saga);
      }
    }

    componentWillUnmount() {
      const { store } = this.props;
      if (this.sagaPromise && this.sagaPromise.cancel) {
        this.sagaPromise.cancel();
        if (store.injectedSagas[key] && store.injectedSagas[key].task) {
          store.injectedSagas[key].task.cancel();
        }
        delete store.injectedSagas[key];
      }
    }

    static getDerivedStateFromProps(props: Props) {
      const {
        store,
        location: { pathname },
      } = props;
      if (currentPath !== pathname) {
        WrapperComponent.dispatchActions({
          actions: globalPageTransitionActions,
          store,
          extraProps: props,
        });
        currentPath = pathname;
      }
      return null;
    }

    render() {
      const { isLoading } = this.state;
      return <WrappedComponent {...this.props} isLoading={isLoading} />;
    }
  };

/**
 * @description
 * Enhance is a one of the crucial utility methods that this framework provides.
 * All components which have their own saga need to be wrapped within this method.
 * It is an HOC which :
 *  1) Attaches dynamic saga and reducer to store
 *  2) Triggers actions required for fetching Data
 *  3) Provides feature of passing mapStateToProps and mapDispatchToProps
 *  4) Components Wrapped with this will have accees to Store, Router and props generated by mapStateToProps and mapDispatchToProps
 *
 * @param {Object} WrappedComponent Page level component to be wrapped with HOC
 * @param {Object} config Configuration
 * @param {function} config.mapStateToProps Map properties from state to props
 * @param {function} config.mapDispatchToProps Map dispatch method for the component
 * @param {string} config.key Unique key identifying the page level component and
 * hence its saga and reducer
 * @param {Object} config.reducer Root reducer for the given page level component
 * @param {Object} config.saga Root saga for the given page level component
 *
 * @example
 * // pages/index.js
 * import { Component } from 'react';
 * import initialActions from './actions';
 * import saga from './sagas';
 * import reducer from './reducer';
 * import { enhance } from 'eiswagen';
 *
 * class Test extends Component {
 *   render() {
 *     return (
 *       <div>
 *         <h2>Test</h2>
 *       </div>
 *     );
 *   }
 * }
 *
 * const mapStateToProps = state => {
 *   return {
 *     test: state.test,
 *   };
 * };
 *
 * export default enhance(Test, {
 *   key: 'test',
 *   initialActions,
 *   saga,
 *   reducer,
 *   mapStateToProps,
 * });
 */
export default (
  WrappedComponent: NextComponentType,
  {
    mapStateToProps,
    mapDispatchToProps,
    key,
    reducer,
    saga,
    initialActions,
    criticalState,
    fireActionsOnEachMount,
  }: EnhanceConfigType
): Node => {
  const WrapperComponent = getWrapperComponent(WrappedComponent, {
    key,
    reducer,
    saga,
    initialActions,
    criticalState,
    fireActionsOnEachMount,
  });

  // Move all non react specific static properties from WrappedComponent to WrapperComponent
  hoistNonReactStatic(WrapperComponent, WrappedComponent);

  // Give a unique identifier to the new high order component
  // $FlowFixMe eslint-disable-line
  WrapperComponent.displayName = `enhanced(${WrappedComponent.displayName ||
    // $FlowFixMe eslint-disable-line
    WrappedComponent.name ||
    'Component'})`;

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
  );
  const withRedux: Function = initRedux({
    key,
    reducer,
    saga,
  });

  return compose(
    withRedux,
    withRouter,
    withConnect
  )(WrapperComponent);
};
