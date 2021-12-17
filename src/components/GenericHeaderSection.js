import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { NavBreadcrumbs, TitleSection } from './index';

const GenericHeaderSection = ({ mainTitle, children, breadCrumbLinks }) => {
  return (
    <Box className='boxBackground' display='flex' alignContent='center'>
      <Grid container>
        <Grid item xs={12}>
          <NavBreadcrumbs crumbs={breadCrumbLinks} />
        </Grid>
        <Grid item xs={12}>
          <TitleSection>{mainTitle}</TitleSection>
          {children}
        </Grid>
        <Grid item xs={12} />
      </Grid>
    </Box>
  );
};
export default GenericHeaderSection;
