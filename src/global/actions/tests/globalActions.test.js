import { getLabels, setCurrentRoute, setApplicationLabels } from '..';
import {
  GET_APPLICATION_LABELS,
  CURRENT_ROUTE,
  GET_APPLICATION_LABELS_SUCCESS,
} from '../../constants';

describe('Global Actions', () => {
  test('should dispatch getLabels', () => {
    expect(getLabels()).toEqual({ type: GET_APPLICATION_LABELS });
  });

  test('should dispatch setApplicationLabels', () => {
    const labels = {};
    expect(setApplicationLabels(labels)).toEqual({
      type: GET_APPLICATION_LABELS_SUCCESS,
      data: labels,
    });
  });

  test('should dispatch setCurrentRoute', () => {
    const pathname = '/cart';
    expect(setCurrentRoute(pathname)).toEqual({ type: CURRENT_ROUTE, pathname });
  });
});
