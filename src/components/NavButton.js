import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
/**
 * Nav Button styled by Material-UI theme
 * @param {*} props.color - optional - primary or secondary
 * @param {*} props.href - link
 * @param {*} props.isExternal - optional - true or false for external link
 * @param {*} props.variant - optional - contained or outlined
 */

export default function NavButton({ children, href, isExternal,...rest }) {

  return (
    <Box>
      { isExternal ?
        <Button component={Link} to={href} {...rest}>
          {children}
        </Button>
        :
        <Button href={href} {...rest} target='_blank'>
          {children}
        </Button>
      }
    </Box>
  );

}
