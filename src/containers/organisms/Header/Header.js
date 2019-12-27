// @flow
import get from 'lodash/get';
import { connect } from 'react-redux';
import HeaderComponent from '../../../components/organisms/Header';

const mapStateToProps = state => ({
  nav: get(state, ['global', 'globalData', 'labels', 'header', 'nav']),
});

export default connect(mapStateToProps)(HeaderComponent);
