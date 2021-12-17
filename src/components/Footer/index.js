import React from 'react';
import Hidden from '@mui/material/Hidden';
import FooterLarge from './FooterLarge';
import FooterSmall from './FooterSmall';

const Footer = () => {
  return (
    <>
      <Hidden mdUp>
        <FooterSmall />
      </Hidden>
      <Hidden smDown>
        <FooterLarge />
      </Hidden>
    </>
  );
};

export default Footer;
