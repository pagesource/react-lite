// @flow

import type { MakeCancelable } from './types';

/**
 * This method extracts query parmas from url and generates object of query params
 * @param {string} pathname
 * @returns {Object}
 *
 * @example
 * let result = parseQueryParams('https://esdoc.org/manual/tags.html?asd=123&name=john#123')
 * console.log(result); // {asd:123, name: john}
 */
export const parseQueryParams = (pathname: string): Object => {
  const search = pathname.split('?')[1];
  if (search) {
    const queryList = search.split('&');
    return queryList.reduce((accu, curr) => {
      const [key, value] = curr.split('=');
      return { ...accu, [key]: value.split('#')[0] };
    }, {});
  }
  return {};
};

// TODO : Build upon the updateState Utility
export const updateState = (state: Object, ...args: Array<Object>): Object =>
  Object.assign({}, state, ...args);

/**
 *
 * This method wraps a promise object and provides cancelling functionality ontop of it
 * @param {promise} promise
 * @returns {Object}
 *
 * @example
 * const somePromise = new Promise(r => setTimeout(r, 1000));
 * const cancelable = makeCancelable(somePromise);
 *
 * cancelable
 *  .promise
 *  .then(() => console.log('resolved'))
 *  .catch(({isCanceled, ...error}) => console.log('isCanceled', isCanceled));
 *
 * // Cancel promise
 * cancelable.cancel();
 */
export const makeCancelable = (promise: Promise<any>): MakeCancelable => {
  let hasCanceled = false;

  /* eslint-disable */
  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(val => (hasCanceled ? reject({ isCanceled: true }) : resolve(val)));
    promise.catch(error => (hasCanceled ? reject({ isCanceled: true }) : reject(error)));
  });
  /* eslint-enable */

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
};
