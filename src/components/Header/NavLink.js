import React, { useState, useEffect } from 'react';
import { NavLink as NaviLink, withRouter, useLocation } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Menu from 'material-ui-popup-state/HoverMenu';
import { makeStyles } from '@material-ui/core/styles';
import {
  usePopupState,
  bindMenu,
  bindHover,
} from 'material-ui-popup-state/hooks';
import { navigation } from '../../navigation';

const useStyles = makeStyles({
  link: {
    fontWeight: 500,
    'white-space': 'nowrap',
    '&:after': {
      display: 'block',
      content: 'attr(title)',
      fontWeight: 700,
      height: '1px',
      visibility: 'hidden',
    },
  },
  activeLink: {
    fontWeight: 700,
    'text-align': 'center',
    '&:hover': {
      fontWeight: 700,
    },
    '&:active': {
      fontWeight: 700,
    },
  },
  menu: {
    padding: '0',
  },
  popover: {
    padding: '0',
  },
  paper: {
    paddingTop: '1rem',
  },
});

const NavLink = ({ id, children, header, route }) => {
  const classes = useStyles();
  const location = useLocation();
  const popupState = usePopupState({ variant: 'popper', popupId: 'navlink' });
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(false);
    const currentNav = navigation.filter((nav) => nav.id === id)[0];
    for (const subNavLink of currentNav.subNavigation) {
      if (subNavLink.route === location.pathname) {
        setActive(true);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <Link
        className={active || popupState.isOpen ? classes.activeLink : classes.link}
        component={NaviLink}
        exact
        to={route}
        title={header}
        underline='none'
        {...bindHover(popupState)}
      >
        {header}
      </Link>
      <Menu
        classes={{ paper: classes.paper, list: classes.menu }}
        elevation={0}
        getContentAnchorEl={null}
        onClick={popupState.close}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        PopoverClasses={{ paper: classes.popover }}
        disableScrollLock={true}
        {...bindMenu(popupState)}
      >
        <div>{children}</div>
      </Menu>
    </>
  );
};

export default withRouter(NavLink);
