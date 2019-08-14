import { END } from 'redux-saga';

import monitorSagas from '../monitorSagas';

describe('monitorSagas', () => {
  let mockStore;
  let shouldResolve = true;
  let globalSagaPromise;
  let injectedSagasPromises;

  beforeEach(() => {
    globalSagaPromise = new Promise((resolve, reject) =>
      shouldResolve ? resolve('resolvedGlobalSaga') : reject()
    );
    injectedSagasPromises = [
      new Promise((resolve, reject) => (shouldResolve ? resolve('resolved1') : reject())), //eslint-disable-line
      new Promise((resolve, reject) => (shouldResolve ? resolve('resolved2') : reject())), //eslint-disable-line
    ];
    mockStore = {
      globalSaga: {
        task: {
          done: globalSagaPromise,
        },
      },
      dispatch: jest.fn(),
      injectedSagas: [
        {
          task: {
            done: injectedSagasPromises[0],
          },
        },
        {
          task: {
            done: injectedSagasPromises[1],
          },
        },
      ],
    };
  });
  test('should call dispatch with END param', async () => {
    expect.assertions(1);
    await monitorSagas(mockStore, true);
    expect(mockStore.dispatch).toHaveBeenCalledWith(END);
  });

  test('should wait for all promises to complete when all resolve', async () => {
    await monitorSagas(mockStore, true);
    expect(globalSagaPromise).resolves.toBe('resolvedGlobalSaga');
    expect(injectedSagasPromises[0]).resolves.toBe('resolved1');
    expect(injectedSagasPromises[1]).resolves.toBe('resolved2');
  });

  test('should wait for all promises to complete when all reject', async () => {
    shouldResolve = false;
    expect.assertions(3);
    await monitorSagas(mockStore, true);
    expect(globalSagaPromise).resolves.toBe('resolvedGlobalSaga');
    expect(injectedSagasPromises[0]).resolves.toBe('resolved1');
    expect(injectedSagasPromises[1]).resolves.toBe('resolved2');
  });
});
