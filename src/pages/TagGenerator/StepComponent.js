import React from 'react';
import { makeStyles } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  stepTypo: {
    color: theme.palette.spectrum.teal,
  },
}));

const StepComponent = ({ step, stepHeading }) => {
  const classes = useStyles();
  return (
    <Grid>
      <Typography variant='h5' className={classes.stepTypo}>
        {step}
      </Typography>
      <Typography variant='h3' className={classes.stepTypo}>
        {stepHeading}
      </Typography>
    </Grid>
  );
};

export default StepComponent;
