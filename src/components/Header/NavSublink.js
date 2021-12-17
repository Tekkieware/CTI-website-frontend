import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { withStyles } from '@mui/material/styles';

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

const NavSublink = ({ classes, header, isExternal = false, route }) => {
  return (
    <>
      {isExternal ? (
        <MenuItem
          className={classes.menuitem}
          component='a'
          data-cy='menuItem'
          disableGutters
          disableRipple
          href={route}
        >
          {header}
        </MenuItem>
      ) : (
        <MenuItem
          className={classes.menuitem}
          component={RouterLink}
          data-cy='menuItem'
          disableGutters
          disableRipple
          to={route}
        >
          {header}
        </MenuItem>
      )}
    </>
  );
};

export default withStyles(styles)(NavSublink);
