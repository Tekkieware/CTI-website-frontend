import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

/**
 * Nav Button styled by Material-UI theme
 * @param {*} props.color - optional - primary or secondary
 * @param {*} props.href - link
 * @param {*} props.isExternal - optional - true or false for external link
 * @param {*} props.variant - optional - contained or outlined
 */

export default function NavButton({ children, href, isExternal, label, title, ...rest }) {

  return isExternal ? (
    <Button aria-label={label} href={href} title={title} {...rest} target='_blank'>
      {children}
    </Button>
  ) : (
    <Button aria-label={label} component={Link} title={title} to={href} {...rest}>
      {children}
    </Button>
  );

}
