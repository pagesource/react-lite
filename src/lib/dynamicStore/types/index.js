// @flow
import type { Store } from 'redux';
import type { Node } from 'react';
import type { RouterHistory } from 'react-router-dom';

export type initialPropsType = {
  store: Object,
  isServer: boolean,
  query: Object,
  res: any,
  asPath: string,
};

export type EnhanceConfigType = {
  mapStateToProps?: <Object, Object, Object>() => Object,
  mapDispatchToProps?: Function,
  key: string,
  reducer: () => Object,
  saga: () => mixed,
  initialActions?: Array<Function>,
  useQuery?: boolean,
  criticalState?: Array<string>,
  fireActionsOnEachMount?: boolean,
};

export type DispatchActionsType = {
  actions: Array<Function>,
  store: Object,
  needQuery?: boolean,
  query: Object,
  initialParams: initialPropsType,
};

export type ClientDispatchActionsType = {
  actions: Array<Function>,
  store: Object,
  extraProps: Object,
};

export type getInjectorsType = {
  injectReducer: Function,
};

export type DescriptorType = {
  saga?: any,
  mode?: any,
};

export type StoreType = Store<Object, Object, Function> & {
  injectedSagas: Object | Map<string, { task: Promise<any> }>,
  runSaga: Function,
  globalSaga?: Object | { task: any, globalSaga: { task: Promise<any> } },
  injectedReducers: Object,
};

export type NextComponentType =
  | Node
  | {
      getInitialProps(): Promise<any>,
      displayName: string,
      name: string,
    }
  | any;

export type Props = {
  dispatch: Function,
  store: Object,
  location: {
    pathname: string,
  },
  history: RouterHistory,
};

export type State = {
  isLoading: boolean,
};

export type InjectorsType = {
  injectSaga: Function,
  ejectSaga: Function,
};

export type MakeCancelable = {
  promise: Promise<any>,
  cancel: () => void,
};

export type ActionType = Array<Function>;
