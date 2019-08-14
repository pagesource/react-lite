// @flow
/**
 *
 * Button
 *
 */
import React from 'react';
import type { Node } from 'react';
import styled from 'styled-components';

import styles from './Button.style';
import type { Props } from './types';

const Button = ({ children }: Props): Node => <div className={styles.default}>{children}</div>;

Button.defaultProps = {};

export default styled(Button)`
  ${styles};
`;

export { Button as ButtonVanilla };
