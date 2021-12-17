import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import Grid from '@mui/material/Grid';
import SortDropdown from '../../components/SortDropdown';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    maxWidth: '8rem',
  },
  query: {
    color: theme.palette.secondary.main,
  },
  select: {
    [theme.breakpoints.down('xs')]: {
      width: '55vw',
    },
  },
}));

const ResultHeader = (props) => {
  const classes = useStyles();
  const inputSortMethodList = ['best match', 'stars'];

  const resultCount = (
    <Typography variant='body2' color='primary'>
      Displaying {props.itemLength} of {props.totalCount} results matching:
      <span className={classes.query}> “{props.queryStr}”</span>
    </Typography>
  );
  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
        {props.variant === 'large' ? resultCount : (
          <Button className={classes.button} onClick={props.onHeaderClick}>
            <FilterListIcon />Filter
          </Button>
        )}
        <Grid>
          <SortDropdown
            inputSortMethodList={inputSortMethodList}
            defaultSortMethod={props.sort}
            setSortMethod={props.setSort}
          />
        </Grid>
      </Box>
      {props.variant === 'small' && resultCount}
    </>
  );
};

export default ResultHeader;
