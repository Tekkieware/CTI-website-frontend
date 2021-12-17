import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  clear: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  filters: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    '& p': {
      marginRight: theme.spacing(1),
    },
  },
}));

const ResultFilters = ({ show, filterTags, onFilterChange }) => {
  const classes = useStyles();
  if (show) {
    return (
      <Box className={classes.filters}>
        <Typography variant='body1'>
          <b>Filter: </b>
        </Typography>
        {filterTags}
        <Typography
          variant='body1'
          color='secondary'
          className={classes.clear}
          onClick={() => onFilterChange({ category: 'all' }, true)}
        >
          <b>Clear all</b>
        </Typography>
      </Box>
    );
  }
  return null;
};

export default ResultFilters;
