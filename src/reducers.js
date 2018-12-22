import { combineReducers } from 'redux';
import homePageReducer from './components/templates/HomePage/reducer';

export default combineReducers({
  homePage: homePageReducer,
});
