// @flow
/**
 * Header
 */
import React from 'react';
import type { Node } from 'react';
import { Link } from 'react-router-dom';
import type { Props } from './types';
import NavBar from '../../molecules/NavBar';

const Header = ({ nav, className }: Props): Node => (
  <div className={className}>
    <header id="header">
      <Link to="/">Sample Logo</Link>
      {nav && <NavBar items={nav} />}
    </header>
  </div>
);

Header.defaultProps = {};

export default Header;
