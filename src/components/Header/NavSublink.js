import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import spectrum from '../../theme-spectrum';

const styles = (theme) => ({
  menuitem: {
    padding: theme.spacing(2),
    '&:hover': {
      backgroundColor: spectrum.mediumBlue,
      color: spectrum.white,
      fontWeight: '700',
    },
  },
});

const NavSublink = ({
  classes,
  header,
  isExternal = false,
  label,
  query,
  route,
  title,
}) => {
  return (
    <>
      {isExternal ? (
        <MenuItem
          aria-label={label}
          className={classes.menuitem}
          component='a'
          data-cy='menu-item'
          disableGutters
          disableRipple
          href={route}
          title={title}
        >
          {header}
        </MenuItem>
      ) : (
        <MenuItem
          aria-label={label}
          className={classes.menuitem}
          component={RouterLink}
          data-cy='menu-item'
          disableGutters
          disableRipple
          title={title}
          to={{ pathname: route, query: query }}
        >
          {header}
        </MenuItem>
      )}
    </>
  );
};

export default withRouter(withStyles(styles)(NavSublink));
