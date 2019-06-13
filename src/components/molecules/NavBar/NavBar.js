/* eslint-disable jsx-a11y/anchor-is-valid */

// @flow
import React from 'react';
import type { Node } from 'react';
import { Anchor } from '@xt-pagesource/atomic-react-pattern-lib';
import { Link } from 'react-router-dom';
import styles from './NavBar.style';
import withStyles from '../../../lib/withStyles';
import type { Props } from './types';
import { isApplicationLink } from '../../../utils/isApplicationLink';

const NavBar = ({ className, items, children }: Props): Node => (
  <nav className={className}>
    {children || (
      <ul>
        {Array.isArray(items) &&
          items.map(({ label, href }, key) => (
            <li role="none" key={key.toString()}>
              {isApplicationLink(href) ? (
                <Link to={href} role="menuitem">
                  {label}
                </Link>
              ) : (
                <Anchor to={href} role="menuitem">
                  {label}
                </Anchor>
              )}
            </li>
          ))}
      </ul>
    )}
  </nav>
);

NavBar.defaultProps = {
  items: [],
};

export default withStyles(NavBar, styles);

export { NavBar };
