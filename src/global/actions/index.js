// @flow
import {
  CURRENT_ROUTE,
  GET_APPLICATION_LABELS,
  GET_APPLICATION_LABELS_SUCCESS,
} from '../constants';

// Page-level actions go here
export const pageActions = [];

const getLabels = () => ({ type: GET_APPLICATION_LABELS });

// All default actions go here
export default [getLabels];

export const setCurrentRoute = (pathname: string) => ({ type: CURRENT_ROUTE, pathname });
export const globalPageTransitionActions = [setCurrentRoute];

export const setApplicationLabels = (labels: Object) => ({
  type: GET_APPLICATION_LABELS_SUCCESS,
  data: labels,
});
