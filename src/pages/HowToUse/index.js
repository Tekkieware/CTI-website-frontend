import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Link from '../../components/common/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import GenericHeaderSection from '../../components/GenericHeaderSection';
import ImageComponent from '../../components/ImageComponent';
import SettingsGearIcon from '../../icons/SettingsGearIcon';

const useStyles = makeStyles((theme) => ({
  boxContainer: {
    padding: '64px 32px',
    margin: 'auto',
  },
  summary: {
    fontSize: '22px', // ** Tentative - Subject to Change **
    marginBottom: '30px',
    textAlign: 'justify',
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
    },
  },
  typoStyle: {
    fontWeight: '400',
    textAlign: 'justify',
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
    },
  },
  boxPadding: {
    padding: '24px 16px 0',
  },
}));

const HowToUse = () => {
  const classes = useStyles();
  const breadCrumbLinks = [
    { href: '/home', name: 'Home' },
    { href: '/join-index/how-to-add', name: 'How to Add Your Project' },
  ];
  return (
    <Box className='pageContainer'>
      <Box className='boxBackground'>
        <Container className='containerDefault'>
          <GenericHeaderSection
            mainTitle='How to Add Your Project'
            breadCrumbLinks={breadCrumbLinks}
          />
        </Container>
      </Box>
      <Box className='containerGray'>
        <Container>
          <Box className={classes.boxContainer}>
            <Box>
              <Typography variant='body1' className={classes.summary}>
                By adding the civictechindex topic tag to your project, we can
                create a continuously updated repository for all civic tech
                enthusiasts to find open source projects to model, connect with,
                and learn from.
              </Typography>
            </Box>
            <Box>
              <Typography variant='body1' className={classes.typoStyle}>
                1. Under your project’s repository, click <SettingsGearIcon />{' '}
                to paste your tags.
              </Typography>
            </Box>
            <Box className={classes.boxPadding}>
              <Typography variant='body1' className={classes.typoStyle}>
                If you don’t see the <SettingsGearIcon /> button it means you
                don’t have &quot;edit repository settings&quot; privileges (and
                can’t perform the steps below).
              </Typography>
              <Typography variant='body1' className={classes.typoStyle}>
                Click{' '}
                <Link key='join-index' to='http://civictechindex.org/join-index/how-to-add'>
                  here
                </Link>
                {' '}
                {/* Please confirm if either 'GitHub' or 'Github' */}
                to copy the url for this page to send to your GitHub admin.
              </Typography>
            </Box>
            <ImageComponent src='/images/instructions-step1.png' alt='Step 1' />
            <Box>
              <Typography variant='body1' className={classes.typoStyle}>
                2. Under{' '}
                <Box component='span' style={{ fontWeight: '700' }}>
                  &quot;Topics&quot;
                </Box>
                , paste the topic you want to add to your repository.{' '}
              </Typography>
            </Box>
            <ImageComponent src='/images/instructions-step2.png' alt='Step 2' />
            <Box>
              <Typography variant='body1' className={classes.typoStyle}>
                3. After you have finished adding your tags, click{' '}
                <Box component='span' style={{ fontWeight: '700' }}>
                  Save Changes
                </Box>{' '}
              </Typography>
            </Box>
            <ImageComponent src='/images/instructions-step3.png' alt='Step 3' />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HowToUse;
