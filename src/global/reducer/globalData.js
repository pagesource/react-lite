// @flow
import get from 'lodash/get';
import { updateState } from '../../lib/dynamicStore/utils';

import {
  DEVICE_TYPE,
  REGION_TYPE,
  CONFIG_KEYS,
  CURRENT_ROUTE,
  IS_TABLET,
  PAGE_URL,
  PAGE_QUERY,
  CHECK_AUTH_SUCCESS,
  SET_USER_STATE,
  USER_STATE_LOGGED_IN,
  UPDATE_SESSION_EMAIL,
  PAGE_ORIGIN,
  GET_APPLICATION_LABELS_SUCCESS,
} from '../constants';
import type {
  DeviceTypeAction,
  GlobalActions,
  ActiveRegionAction,
  ConfigKeyAction,
  RouteAction,
  setIsTabletAction,
} from '../types';
import { setCookie } from '../../utils/utils';

export const initState = {
  deviceType: '',
  activeRegion: '',
};

const setDevice = (state: Object, deviceType): DeviceTypeAction =>
  updateState(state, { deviceType });

const setIsTablet = (state: Object, isTablet): setIsTabletAction =>
  updateState(state, { isTablet });

const setConfigKeys = (state: Object, configKeys): ConfigKeyAction =>
  updateState(state, { configKeys });

const setRegion = (state: Object, activeRegion): ActiveRegionAction =>
  updateState(state, { activeRegion });

const setPageUrl = (state: Object, pageUrl): ActiveRegionAction => updateState(state, { pageUrl });

const setRoute = (state: Object, pathname): RouteAction => updateState(state, { route: pathname });

const setPageQuery = (state: Object, pageQuery) => updateState(state, { pageQuery });

const setAuthentication = (state, sessionInfo) => updateState(state, { sessionInfo });
const setSessionEmail = state => {
  const sessionInfo = get(state, 'sessionInfo');
  return updateState(state, { sessionInfo });
};

const setUserState = (state, userState) => {
  if (userState === USER_STATE_LOGGED_IN) setCookie('lastLogin', new Date());
  return updateState(state, { userState });
};

const setPageOrigin = (state, origin) => updateState(state, { pageOrigin: origin });

const setApplicationLabels = (state, labels) => updateState(state, { labels });

/* eslint-disable */
export default (state: Object = initState, action: GlobalActions) => {
  switch (action.type) {
    case DEVICE_TYPE:
      return setDevice(state, get(action, 'deviceType'));
    case IS_TABLET:
      return setIsTablet(state, get(action, 'isTablet'));
    case REGION_TYPE:
      return setRegion(state, get(action, 'activeRegion'));
    case CONFIG_KEYS:
      return setConfigKeys(state, get(action, 'configKeys'));
    case CURRENT_ROUTE:
      return setRoute(state, get(action, 'pathname'));
    case PAGE_URL:
      return setPageUrl(state, get(action, 'pageUrl'));
    case PAGE_QUERY:
      return setPageQuery(state, get(action, 'pageQuery'));
    case CHECK_AUTH_SUCCESS:
      return setAuthentication(state, get(action, 'sessionInfo'));
    case UPDATE_SESSION_EMAIL:
      return setSessionEmail(state);
    case SET_USER_STATE:
      return setUserState(state, get(action, 'userState'));
    case PAGE_ORIGIN:
      return setPageOrigin(state, get(action, 'origin'));
    case GET_APPLICATION_LABELS_SUCCESS:
      return setApplicationLabels(state, get(action, 'data'));
    default:
      return state;
  }
};
/* eslint-enable */
