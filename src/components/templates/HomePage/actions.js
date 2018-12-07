export const setHomePageData = pageName => ({
  type: 'SET_HOME_PAGE_DATA',
  data: {
    pageName,
  },
});

export default setHomePageData;
