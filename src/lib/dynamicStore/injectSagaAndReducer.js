// @flow
import invariant from 'invariant';
import isString from 'lodash/isString';

import getSagaInjectors from './sagaInjectors';
import getReducerInjectors from './reducerInjectors';

export default (key: string, store: Object, saga?: Function, reducer?: Function) => {
  invariant(
    isString(key),
    `injectSagaAndReducer.js: Expected "key" to be a string, found it to be ${typeof key}`
  );

  const { injectReducer } = getReducerInjectors(store);
  const { injectSaga } = getSagaInjectors(store);

  if (reducer) injectReducer(key, reducer);
  if (saga) injectSaga(key, { saga });
};
