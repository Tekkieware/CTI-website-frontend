import React from 'react';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import useStyles from './styles';

export const AffiliationQuestionSection = ({
  children,
  handleChange,
  value,
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.questionContainerPadding}>
        <Grid item xs={12} className={classes.questionGridPadding}>
          {children}
        </Grid>
        <Grid item xs={4} sm={8}>
          <Radio
            checked={value === 'yes'}
            data-cy='radio-yes'
            onChange={handleChange}
            value='yes'
            name='yes'
            inputProps={{ 'aria-label': 'true' }}
          />{' '}
          Yes
        </Grid>
        <Grid item xs={4} sm={8}>
          <Radio
            checked={value === 'no'}
            data-cy='radio-no'
            onChange={handleChange}
            value='no'
            name='no'
            inputProps={{ 'aria-label': 'false' }}
          />{' '}
          No
        </Grid>
      </Grid>
    </>
  );
};
