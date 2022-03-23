import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  sectionMainTitle:{
    marginBottom:'32px',

    [theme.breakpoints.down('md')]: {
      marginBottom:'40px',
      fontSize: '31px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '28px',
    },

  },
  sectionSubTitle:{
    marginBottom:'16px',
    [theme.breakpoints.down('md')]: {
      marginBottom:'31px',
    },
  },
  homeTag: {
    backgroundColor: theme.palette.background.default,
    borderRadius: '8px',
    padding: '0 4px',
    textDecoration:'underline',
    '&.MuiChip-outlined': {
      borderColor: theme.palette.outline.gray,
    },
    [theme.breakpoints.down('md')]: {
      height: '36px',
    },
    [theme.breakpoints.up('md')]: {
      height: '42px',
    },
  },
  trendingContainerStyle: {
    marginTop: '80px',
    paddingBottom: '96px',
    width: '50%',
    marginLeft: '5%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

const topicData = [
  { tag: 'election', search: 'election' },
  { tag: 'food-pantry', search: 'food' },
  { tag: 'budget', search: 'budget' },
  { tag: '311', search: '311' },
];

const TrendingTopicsSection = () => {
  const classes = useStyles();
  const TrendingTopicList = () => {
    return (
      topicData.map((topic, key) => {
        return (
          <Chip
            key={key}
            className = {classes.homeTag}
            clickable
            component={RouterLink}
            label={topic.tag}
            to={{ pathname: '/search-projects', query: { search: topic.search }}}
          />
        );
      })
    );
  }

  return (
    <Grid container className={classes.trendingContainerStyle}>
      <Grid item lg={10}>
        <Typography variant='h3' color='textPrimary' aria-level='2' className={classes.sectionMainTitle}>
          How are people using the CTI?
        </Typography>
        <Typography variant='h5' color='textSecondary' aria-level='3' className={classes.sectionSubTitle}>
          Trending Topics:
        </Typography>
        <TrendingTopicList />
      </Grid>
    </Grid>
  );
};

export default TrendingTopicsSection;
