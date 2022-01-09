import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  menuitem: {
    padding: theme.spacing(2),
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.text.secondary,
      fontWeight: '700',
    },
  },
});

const NavSublink = ({ classes, header, isExternal = false, label, route, title }) => {
  return (
    <>
      {isExternal ? (
        <MenuItem
          aria-label={label}
          className={classes.menuitem}
          component='a'
          data-cy='menuItem'
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
          data-cy='menuItem'
          disableGutters
          disableRipple
          title={title}
          to={route}
        >
          {header}
        </MenuItem>
      )}
    </>
  );
};

export default withRouter(withStyles(styles)(NavSublink));
