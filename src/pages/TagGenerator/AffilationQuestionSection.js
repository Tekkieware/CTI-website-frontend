import React from 'react';
import Radio from '@mui/material/Radio';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useStyles from './styles';

export const AffiliationQuestionSection = ({
  value,
  handleChange,
  question,
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.questionContainerPadding}>
        <Grid item xs={12} className={classes.questionGridPadding}>
          <Typography variant='body1'>{question}</Typography>
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
