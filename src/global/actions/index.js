// @flow
import {
  CURRENT_ROUTE,
  GET_APPLICATION_LABELS,
  GET_APPLICATION_LABELS_SUCCESS,
} from '../constants';

// Page-level actions go here
export const pageActions = [];

export const getLabels = () => ({ type: GET_APPLICATION_LABELS });
export const setApplicationLabels = (labels: Object) => ({
  type: GET_APPLICATION_LABELS_SUCCESS,
  data: labels,
});
export const setCurrentRoute = (pathname: string) => ({ type: CURRENT_ROUTE, pathname });

// All default actions go here
export const globalPageTransitionActions = [setCurrentRoute];
export default [getLabels];
