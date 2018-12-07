import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setHomePageData } from './actions';

class HomePage extends PureComponent {
  static propTypes = {
    pageName: PropTypes.string,
    setHomePageName: PropTypes.func.isRequired,
  };

  static defaultProps = {
    pageName: '',
  };

  componentDidMount() {
    const { setHomePageName } = this.props;
    setHomePageName('Home Page');
  }

  render() {
    const { pageName } = this.props;

    return <div>{`This is ${pageName}`}</div>;
  }
}

export const mapStateToProps = state => ({
  pageName: state && state.homePage && state.homePage.pageName,
});

export const mapDispatchToProps = dispatch => ({
  setHomePageName: () => {
    dispatch(setHomePageData('Home Page'));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
