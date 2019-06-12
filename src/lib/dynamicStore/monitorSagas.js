// @flow

import each from 'lodash/each';
import { END } from 'redux-saga';

import type { StoreType, MakeCancelable } from './types';
import getSagaInjectors from './sagaInjectors';
import { makeCancelable } from './utils';

/**
 * monitorSagas - Wait till all sagas have been done
 * @param {Object} store
 * @param {boolean} isServer
 * @param {boolean} shouldDispatchEnd
 * @returns {Promise}
 * @private
 */
export default function monitorSagas(
  store: StoreType,
  isServer?: boolean,
  shouldDispatchEnd: boolean = true
): MakeCancelable {
  const allTasks: Array<Object> = store.globalSaga ? [store.globalSaga.task] : [];
  if (shouldDispatchEnd) store.dispatch(END);
  each(store.injectedSagas, saga => {
    allTasks.push(saga.task);
  });

  return makeCancelable(
    // eslint-disable-next-line
    Promise.all(allTasks.map(t => t.done)).then(() => {
      if (!isServer && shouldDispatchEnd) {
        const { injectSaga } = getSagaInjectors(store);
        each(store.injectedSagas, (descriptor, key) => {
          const { saga } = descriptor;
          injectSaga(key, { saga });
        });
        if (store.globalSaga && store.globalSaga.task && !store.globalSaga.task.isRunning()) {
          // eslint-disable-next-line
          store.globalSaga = {
            globalSaga: store.globalSaga.globalSaga,
            task: store.runSaga(store.globalSaga.globalSaga),
          };
        }
      }
    })
  );
}
