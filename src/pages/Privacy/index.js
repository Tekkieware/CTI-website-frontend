import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BottomCallToAction from '../../components/BottomCallToAction';
import Link from '../../components/common/Link';
import useStyles from './styles.js';
import { GenericHeaderSection } from '../../components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
// import CircleIcon from '@mui/icons-material/Circle';
 import StarIcon from '@material-ui/icons/Star';

const Donate = () => {
  const classes = useStyles();
  const breadCrumbLinks = [
    { href: '/home', name: 'Home' },
    { href: '/privacy', name: 'Privacy' },
  ];

  const overviewList = [
    "We may collect information from you when you visit and take actions on our website. We use this information to provide the services you've requested.",
    "We utilize cookies (such as those stored by Google Analytics) to provide a better experience and improve our review tool website for your use.",
    "We will not knowingly disclose or sell your personal information to any third party, except as provided in this privacy policy.",
    "Protecting your personal information is extremely important to us, and we take all reasonable measures to do so."
  ]

  const personaliList = [
    "We may automatically collect and store data about your visit to CivicTechIndex.org",
    "None of the information we collect about you when you visit CivicTechIndex.org is personally identifiable.",
    "We use this non personally identifiable information to understand how the CivicTechIndex.org website is used, to improve the website, and to monitor usage for security purposes.",
    "We will not collect personal information from you without your knowledge and consent, except in a few limited circumstances as described in this policy."
  ]

  return (
    <Box className='pageContainer'>
      <Box className='boxBackground'>
        <Container className='containerDefault'>
          <GenericHeaderSection
            mainTitle='Privacy Policy'
            breadCrumbLinks={breadCrumbLinks}
          />
        </Container>
      </Box>
      <Box className='containerGray'>
        <Container>
          <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.firstGrid}>
            <Grid item xs={10}>
            <Typography variant='body1' className={classes.textAlign} >
              We respect your privacy, and recognize that we must maintain and
              use your information responsibly.
            </Typography>
            </Grid>
            <Grid item xs={8}>
            <Typography variant='body1' className={classes.typoPadding}>
              CivicTechIndex.org is an informational website managed by Hack for
              LA which is a project (of Code for America Labs, Inc. ("Code for
              America", "we", "us", "our"). This Privacy Policy describes how we
              collect, use, and protect your personal information on this
              website. By submitting your personal information on our websites,
              you agree to the terms in this Privacy Policy. If you do not agree
              with these terms, please do not use our websites.
            </Typography>
            </Grid>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant='h4' className={classes.h4Style}>Overview</Typography>
            <Grid item xs={8}>
            <List>
                {overviewList.map((item,index) => (
                  <ListItem key={index}>
                  <ListItemIcon>
                  <StarIcon />
                    {/* <CircleRoundedIcon /> */}
                  </ListItemIcon>
                  <ListItemText
                      primary={item}/>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
          <Grid>
            <Typography variant='h4' className={classes.h4Style}>
              The personal information we collect
            </Typography>
          </Grid>
          <Grid>
            <Typography variant='h6'>Visiting CivicTechIndex.org</Typography>
            <ul>
              <li>
              We may automatically collect and store data about your visit to CivicTechIndex.org 
                <ul className='sub-list'>
                  <li>Domain from which you access the Internet</li>
                  <li>
                    Operating system on your computer and information about the
                    browser you used when visiting the site
                  </li>
                  <li>Date and time of your visit</li>
                  <li>Pages you visited</li>
                  <li>
                    Address of the website that connects you to the Site (such
                    as google.com or bing.com)
                  </li>
                  <li>
                    The queries you make on our site. 
                  </li>
                </ul>
              </li>
              <li>
              None of the information we collect about you when you visit CivicTechIndex.org is personally identifiable. 
              </li>
              <li>
              We use this non personally identifiable information to understand how the CivicTechIndex.org website is used, to improve the website, and to monitor usage for security purposes.
              </li>
              <li>
              We will not collect personal information from you without your knowledge and consent, except in a few limited circumstances as described in this policy.
              </li>
            </ul>
          </Grid>
          <Grid>
            <Typography variant='h6'>E-mail Addresses</Typography>
          </Grid>
          <Grid>
            <Typography variant='body1'>
              E-mail addresses obtained through the website will not be sold or
              given to private companies for marketing purposes. The information
              collected is subject to the access and confidentiality provisions
              of the Public Records Act, other applicable sections of the
              California code, as well as federal laws. Individuals can cancel
              any communications regarding new service updates at any time.
            </Typography>
          </Grid>
          <Grid>
            <Typography variant='h6'>Google Analytics</Typography>
          </Grid>
          <Grid>
            <ul>
              <li>
                We use Google Analytics to understand how visitors use our site
                and to gather aggregate performance metrics.
              </li>
              <li>
                We’ve set up Google Analytics so that it doesn’t collect your
                full IP address.
              </li>
              <li>
                {`We don’t collect any personally identifiable information using Google Analytics, and we do not combine the information
          collected through Google Analytics with any personally identifiable information.`}
              </li>
              <li>
                {`Google Analytics places a cookie on your web browser to identify you as a unique user. This cookie cannot be used by anyone but Google.
          Google's ability to use and share information collected by Google Analytics about your visits to this site is restricted by the `}
                <a href='http://www.google.com/analytics/terms/us.html'>
                  Google Analytics Terms of Use
                </a>
                &nbsp;and the&nbsp;
                <a href='http://www.google.com/policies/privacy/'>
                  Google Privacy Policy
                </a>
                .
              </li>
            </ul>
          </Grid>
          <Grid>
            <Typography variant='body1'>
              To provide website visitors the ability to prevent their data from
              being used by Google Analytics, Google has developed the Google
              Analytics opt-out browser add-on for the Google Analytics
              JavaScript (ga.js, analytics.js, dc.js). This add-on instructs the
              Google Analytics JavaScript (ga.js, analytics.js, and dc.js)
              running on websites to prohibit sending information to Google
              Analytics. Visit https://tools.google.com/dlpage/gaoptout/ for
              more info on how to opt out.
            </Typography>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Donate;
