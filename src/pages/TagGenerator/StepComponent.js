import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  stepTypo: {
    color: theme.palette.spectrum.teal,
  },
}));

const StepComponent = ({ step, stepHeading }) => {
  const classes = useStyles();
  return (
    <Grid>
      <Typography variant='h5' aria-level='2' className={classes.stepTypo}>
        {step}
      </Typography>
      <Typography variant='h3' aria-level='3' className={classes.stepTypo}>
        {stepHeading}
      </Typography>
    </Grid>
  );
};

export default StepComponent;
