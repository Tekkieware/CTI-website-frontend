import React from 'react';
import Hidden from '@mui/material/Hidden';
import HeaderSmall from './HeaderSmall';
import HeaderLarge from './HeaderLarge';

const Header = () => {
  return (
    <>
      <Hidden mdUp>
        <HeaderSmall />
      </Hidden>
      <Hidden smDown>
        <HeaderLarge />
      </Hidden>
    </>
  );
};

export default Header;
