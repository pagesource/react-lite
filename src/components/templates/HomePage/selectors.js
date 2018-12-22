import { createSelector } from 'reselect';

const getHomePageState = state => state.homePage;

export const getHomePageName = createSelector(
  getHomePageState,
  homePageState => homePageState.pageName
);

export default getHomePageName;
