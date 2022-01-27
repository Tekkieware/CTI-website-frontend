// See https://github.com/ReactTraining/react-router/issues/1147

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';
import makeStyles from '@material-ui/core/styles/makeStyles';
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';
import spectrum from '../../theme-spectrum';

const useStyles = makeStyles({
  icon: {
    height: '0.875rem',
    '& svg': {
      transform: 'translateY(4px)',
    },
  },
  link: {
    color: spectrum.mediumBlue,
    cursor: 'pointer',
    fontWeight: 700,
    textDecoration: 'underline',
    '&:active': {
      color: spectrum.lightBlue,
    },
    '&:link': {
      color: spectrum.mediumBlue,
    },
    '&:hover': {
      color: spectrum.lightBlue,
    },
    '&:visited': {
      color: spectrum.purple,
    },
  },
});

const Link = ({ to, children, ...props }) => {
  const classes = useStyles();

  // If it has no 'to', just style it like a link
  if (!to) {
    return (
      <MuiLink {...props} className={classes.link}>
        {children}
      </MuiLink>
    );
  }

  // If 'to' is an external link, include icon
  if (/^https?:\/\//.test(to)) {
    return (
      <a href={to} className={classes.icon} {...props}>
        {children} <OpenInNewRoundedIcon fontSize='inherit' />
      </a>
    );
  }

  // Else assume 'to' is a route
  return (
    <RouterLink to={to} className={classes.link} {...props}>
      {children}
    </RouterLink>
  );
};

export default Link;
