import React from 'react';
import makeStyles from '@mui/material/styles/makeStyles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { GetStartedCard, NavButton } from '../../components';
import NotableUsersSection from './sections/NotableUsersSection';
import TrendingTopicsSection from './sections/TrendingTopicsSection';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  marketingPointContainerStyle: {
    fontSize: '18px',
    paddingTop: '8px',
    '& p': {
      width: '30%',
    },
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: '35px',
      flexDirection: 'column',
      width: '100%',
      height: '162px',
      marginBottom: '30px',
      justifyContent: 'space-between',
      '& p': {
        width: '80%',
      },
      '& br': {
        display: 'none',
      },
    },
  },
  localTitleSectionStyle: {
    paddingTop: '5%',
  },
  localTitleStyle: {
    color: theme.palette.warning.main,
    textAlign: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: 32,
    },
  },
}));

const MarketingSection = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      alignItems='center'
      justify='center'
      className={classes.marketingPointContainerStyle}
    >
      <Typography variant='body1' color='textSecondary'>
        Requires no coding
      </Typography>
      <Typography variant='body1' color='textSecondary'>
        {' '}
        Make your project more <br /> visible with GitHub’s open-source <br />
        communities
      </Typography>
      <Typography variant='body1' color='textSecondary'>
        {' '}
        The Index is owned by <br />
        all who use it
      </Typography>
    </Grid>
  );
};

const CallToActionSection = () => {
  return (
    <Grid container style={{ paddingTop: '35px' }} justify='center'>
      <Grid container justify='space-around' style={{ width: '392px' }}>
        <NavButton href='/join-index' color='primary'>
          Add Your Project
        </NavButton>
        <NavButton href='/about' variant='outlined'>
          Learn More
        </NavButton>
      </Grid>
    </Grid>
  );
};

const Home = () => {
  const classes = useStyles();
  return (
    <>
      <Box className='boxBackground'>
        <div className='containerWorld'>
          <Container disableGutters>
            <Box component='div'>
              <Grid container
                alignItems='center'
                justify='center'
                className={classes.localTitleSectionStyle}>
                <Grid item xs={11} md={8} lg={10}>
                  <Typography variant='h2' className={classes.localTitleStyle}>
                    Join a worldwide movement to catalog every open-source civic
                    tech project.
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <MarketingSection />
            <CallToActionSection />
            <NotableUsersSection />
            <TrendingTopicsSection />
          </Container>
        </div>
        <GetStartedCard
          headerTitle='Ready to get started?'
          buttonText='Add Your Project'
          buttonHref='/join-index'
        />
      </Box>
    </>
  );
};

export default Home;
