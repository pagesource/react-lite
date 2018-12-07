export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_HOME_PAGE_DATA':
      return action.data;
    default:
      return state;
  }
};
