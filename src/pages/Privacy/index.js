import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles.js';
import { GenericHeaderSection } from '../../components';
import Link from '@material-ui/core/Link';

const overviewList = [
  "We may collect information from you when you visit and take actions on our website. We use this information to provide the services you've requested.",
  'We utilize cookies (such as those stored by Google Analytics) to provide a better experience and improve our review tool website for your use.',
  'We will not knowingly disclose or sell your personal information to any third party, except as provided in this privacy policy.',
  'Protecting your personal information is extremely important to us, and we take all reasonable measures to do so.',
];

const personalInfoSubList = [
  'Domain from which you access the Internet',
  'Operating system on your computer and information about the browser you used when visiting the site',
  'Date and time of your visit',
  'Pages you visited',
  'Address of the website that connects you to the Site (such as google.com or bing.com)',
  'The queries you make on our site.',
];

const personalInfoList = [
  'None of the information we collect about you when you visit CivicTechIndex.org is personally identifiable.',
  'We use this non personally identifiable information to understand how the CivicTechIndex.org website is used, to improve the website, and to monitor usage for security purposes.',
  'We will not collect personal information from you without your knowledge and consent, except in a few limited circumstances as described in this policy.',
];

const googleAnalyticsList = [
  'We use Google Analytics to understand how visitors use our site and to gather aggregate performance metrics.',
  'We’ve set up Google Analytics so that it doesn’t collect your full IP address.',
  'We don’t collect any personally identifiable information using Google Analytics, and we do not combine the information collected through Google Analytics with any personally identifiable information.',
];
const cookiesList = [
  'Cookies are small text files that websites place on the computers and mobile devices of people who visit those websites..',
  'We use cookies and other technologies like pixel tags to remember your preferences, enhance your online experience, and to gather data on how you use our Sites to improve the way we promote our content, programs, and events.',
  'Your use of our Sites indicates your consent to such use of Cookies.',
];

const lawList = [
  'comply with law enforcement requests and legal process, such as a court order or subpoena;',
  'respond to your requests; or',
  'protect your, our, or others’ rights, property, or safety.',
];

const securityList = [
  "CivicTechIndex.org utilizes Amazon Web Services (AWS).  AWS operates 'secure data networks' protected by industry standard firewalls and password protection systems. Only authorized individuals have access to the information provided by our users.",
  'We make reasonable efforts to protect your information by using physical and electronic safeguards designed to improve the security of the information we maintain. However, as our Services are hosted electronically, we make no guarantees as to the security or privacy of your information.',
];

const Privacy = () => {
  const classes = useStyles();
  const breadCrumbLinks = [
    { href: '/home', name: 'Home' },
    { href: '/privacy', name: 'Privacy' },
  ];


  const Heading = ({ heading }) => {
    return (
      <Grid className={classes.gridHeadingStyle}>
        <Typography variant='h4' className={classes.h4Style}>
          {heading}
        </Typography>
      </Grid>
    );
  };
  const SubHeading = ({ subHeading }) => {
    return (
      <Grid item xs={10} md={8} className={classes.gridSubStyle}>
        <Typography variant='h6' className={classes.h6Style}>
          {subHeading}
        </Typography>
      </Grid>
    );
  };

  const Paragraph = ({ text }) => {
    return (
      <Grid item xs={10} md={8} className={classes.gridMargin}>
        <Typography variant='body1'>{text}</Typography>
      </Grid>
    );
  };

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
          <Grid
            container
            direction='column'
            justifycontent='center'
            alignItems='center'
            className={classes.firstGrid}
          >
            <Grid item xs={10}>
              <Typography variant='body1' className={classes.textAlign}>
                We respect your privacy, and recognize that we must maintain and
                use your information responsibly.
              </Typography>
            </Grid>
            <Grid item xs={10} md={8}>
              <Typography variant='body1' className={classes.typoPadding}>
                CivicTechIndex.org is an informational website managed by Hack
                for LA which is a project (of Code for America Labs, Inc. (&quot;Code
                for America&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;). This Privacy Policy describes
                how we collect, use, and protect your personal information on
                this website. By submitting your personal information on our
                websites, you agree to the terms in this Privacy Policy. If you
                do not agree with these terms, please do not use our websites.
              </Typography>
            </Grid>
          </Grid>
          <Heading heading="Overview"/>
          <Grid item xs={10} md={8} className={classes.gridMargin}>
            <ul>
              {overviewList.map((item, index) => (
                <li key={index} className={classes.listItemStyle}>
                  <Typography variant='body1'>{item}</Typography>
                </li>
              ))}
            </ul>
          </Grid>
          <Grid className={classes.personalInfoStyle}>
            <Typography variant='h4' className={classes.h4Style}>
              The personal information we collect
            </Typography>
          </Grid>
          <SubHeading subHeading="Visiting CivicTechIndex.org"/>
          <Grid item xs={10} md={8} className={classes.gridMargin}>
            <ul>
              <li className={classes.listItemStyle}>
                <Typography variant='body1'>
                  We may automatically collect and store data about your visit
                  to CivicTechIndex.org
                </Typography>
              </li>
              <ul>
                {personalInfoSubList.map((item, index) => (
                  <li key={index} className={classes.listItemStyle}>
                    <Typography variant='body1'>{item}</Typography>
                  </li>
                ))}
              </ul>
              {personalInfoList.map((item, index) => (
                <li key={index} className={classes.listItemStyle}>
                  <Typography variant='body1'>{item}</Typography>
                </li>
              ))}
            </ul>
          </Grid>
          <SubHeading subHeading="E-mail Addresses"/>
          <Paragraph
            text={
              'E-mail addresses obtained through the website will not be sold or given to private companies for marketing purposes. The information collected is subject to the access and confidentiality provisions of the Public Records Act, other applicable sections of the California code, as well as federal laws. Individuals can cancel any communications regarding new service updates at any time.'
            }
          />
          <SubHeading subHeading="Google Analytics"/>
          <Grid item xs={10} md={8} className={classes.gridMargin}>
            <ul>
              {googleAnalyticsList.map((item, index) => (
                <li key={index} className={classes.listItemStyle}>
                  <Typography variant='body1'>{item}</Typography>
                </li>
              ))}
              <li className={classes.listItemStyle}>
                <Typography variant='body1' className={classes.linkStyle}>
                  Google Analytics places a cookie on your web browser to
                  identify you as a unique user. This cookie cannot be used by
                  anyone but Google. Google&apos;s ability to use and share
                  information collected by Google Analytics about your visits to
                  this site is restricted by the&nbsp;
                  <Link
                    target='_blank'
                    href='http://www.google.com/analytics/terms/us.html'
                    underline='always'
                  >
                    Google Analytics Terms of Use
                  </Link>
                  &nbsp;and the&nbsp;
                  <Link
                    target='_blank'
                    href='http://www.google.com/policies/privacy/'
                    underline='always'
                  >
                    Google Privacy Policy
                  </Link>
                  .
                </Typography>
              </li>
            </ul>
          </Grid>
          <Grid item xs={10} md={8} className={classes.gridMargin}>
            <Typography variant='body1' className={classes.linkStyle}>
              To provide website visitors the ability to prevent their data from
              being used by Google Analytics, Google has developed the Google
              Analytics opt-out browser add-on for the Google Analytics
              JavaScript (ga.js, analytics.js, dc.js). This add-on instructs the
              Google Analytics JavaScript (ga.js, analytics.js, and dc.js)
              running on websites to prohibit sending information to Google
              Analytics. Visit&nbsp;
              <Link
                target='_blank'
                href='https://tools.google.com/dlpage/gaoptout/'
                underline='always'
              >
                https://tools.google.com/dlpage/gaoptout/
              </Link>
              &nbsp;for more info on how to opt out.
            </Typography>
          </Grid>
          <Heading heading='Cookies and other tracking technologies' />
          <Grid item xs={10} md={8} className={classes.gridMargin}>
            <ul>
              {cookiesList.map((item, index) => (
                <li key={index} className={classes.listItemStyle}>
                  <Typography variant='body1'>{item}</Typography>
                </li>
              ))}
            </ul>
          </Grid>
          <SubHeading subHeading="Third party service providers"/>
          <Grid item xs={10} md={8} className={classes.gridMargin}>
            <Typography variant='body1'>
              We use third-party service providers to track and analyze
              statistical usage and volume information from our Site users.
              These third-party service providers use persistent Cookies to help
              us to improve the user experience, manage the content on our
              Sites, and analyze how users navigate and use the Sites.
            </Typography>
          </Grid>
          <Grid item xs={10} md={8} className={classes.gridMargin}>
            <Typography variant='body1' className={classes.padding}>
              Third-party service providers we may use include&nbsp;
              <Link
                target='_blank'
                href='https://analytics.google.com/analytics'
                underline='always'
              >
                Google Analytics,
              </Link>
              <Link
                target='_blank'
                href='https://mixpanel.com/'
                underline='always'
              >
                &nbsp;Mixpanel,
              </Link>
              <Link
                target='_blank'
                href='https://www.hotjar.com/'
                underline='always'
              >
                &nbsp;Hotjar
              </Link>
            </Typography>
          </Grid>
          <SubHeading subHeading="How to opt-out of the use of cookies"/>
          <Grid item xs={10} md={8} className={classes.gridMargin}>
            <Typography variant='body1'>
              Most browsers are initially set up to accept HTTP cookies. If you
              want to restrict or block the cookies that are set by our Site, or
              any other site, you can do so through your browser setting. The
              ‘Help’ function in your browser should explain how. Alternatively,
              you can visit&nbsp;
              <Link
                target='_blank'
                href='www.aboutcookies.org'
                underline='always'
              >
                www.aboutcookies.org,
              </Link>
              &nbsp;which contains comprehensive information on how to do this
              on a wide variety of browsers. You will find general information
              about cookies and details on how to delete cookies from your
              machine.
            </Typography>
          </Grid>
          <Heading heading='As required by law and similar disclosures' />
          <Grid item xs={10} md={8} className={classes.gridMargin}>
            <ul>
              <li className={classes.listItemStyle}>
                <Typography variant='body1'>
                  We may access, preserve, and disclose your information if we
                  believe doing so is required or appropriate to:
                </Typography>
              </li>
              <ul>
                {lawList.map((item, index) => (
                  <li key={index} className={classes.listItemStyle}>
                    <Typography variant='body1'>{item}</Typography>
                  </li>
                ))}
              </ul>
              <li className={classes.listItemStyle}>
                <Typography variant='body1'>
                  For the avoidance of doubt, the disclosure of your information
                  may occur if you post any objectionable content on or through
                  the Site.
                </Typography>
              </li>
            </ul>
          </Grid>
          <Heading heading='Consent' />
          <Grid item xs={10} md={8} className={classes.gridMargin}>
            <ul>
              <li className={classes.listItemStyle}>
                <Typography variant='body1'>
                  We may also disclose information from you or about you or your
                  devices with your permission.
                </Typography>
              </li>
            </ul>
          </Grid>
          <Heading heading='Children’s privacy' />
          <Grid item xs={10} md={8} className={classes.gridMargin}>
            <ul>
              <li className={classes.listItemStyle}>
                <Typography variant='body1'>
                  If you learn that a child has provided us with personal
                  information in violation of this Privacy Policy, then you may
                  alert us at&nbsp;
                  <Link
                    target='_blank'
                    href='mailto:privacy@hackforla.org'
                    underline='always'
                  >
                    privacy@hackforla.org
                  </Link>
                  &nbsp;and reference “Child Privacy Report” in the subject
                  line.
                </Typography>
              </li>
              <li className={classes.listItemStyle}>
                <Typography variant='body1'>
                  We do not knowingly collect, maintain, or use personal
                  information from children under 13 years of age, and no part
                  of our Site is directed to children.
                </Typography>
              </li>
            </ul>
          </Grid>
          <Heading heading='Security' />
          <Grid item xs={10} md={8} className={classes.gridMargin}>
            <ul>
              {securityList.map((item, index) => (
                <li key={index} className={classes.listItemStyle}>
                  <Typography variant='body1'>{item}</Typography>
                </li>
              ))}
            </ul>
          </Grid>
          <Heading heading='Right to be forgotten and rectification' />
          <Grid item xs={10} md={8} className={classes.gridMargin}>
            <ul>
              <li className={classes.listItemStyle}>
                <Typography variant='body1'>
                  You may request that we make corrections to any personal data
                  that is stored on our internal databases at any time. You may
                  request that incomplete data be completed or that incorrect
                  data be corrected. Requests can be submitted to
                  privacy@hackforla.org and reference “HackforLA Public Website”
                  in the subject line.
                </Typography>
              </li>
            </ul>
          </Grid>
          <Heading heading='Changes' />
          <Paragraph text='This CivicTechIndex.org Privacy Policy is subject to change from time to time in response to, or as a result of, changes in federal, state, and/or local law. Please check this page frequently for updates, as your continued use of this site after any changes in this Privacy Policy will constitute your acceptance of the changes.' />
          <Heading heading='Effective Date' />
          <Grid item xs={10} md={8} className={classes.gridMargin}>
            <Typography variant='body1'>
              This version of the policy is effective{' '}
              <Box component='span' className={classes.boldFont}>
                January 1, 2022.
              </Box>
            </Typography>
          </Grid>
          <Heading heading='Questions' />
          <Grid item xs={10} md={8} className={classes.gridMargin}>
            <Typography variant='body1'>
              If you have any questions, comments, concerns, or complaints
              related to our websites, please contact us by email at&nbsp;
              <Link
                target='_blank'
                href='mailto:privacy@hackforla.org'
                underline='always'
              >
                privacy@hackforla.org
              </Link>
              , or by mail at:
            </Typography>
          </Grid>
          <Grid item xs={10} md={8} className={classes.gridPadding}>
            <Typography variant='body1'>Code for America</Typography>
            <Typography variant='body1'>
              Ref: Hack for LA, CivicTechIndex.org
            </Typography>
            <Typography variant='body1'>155 9th Street</Typography>
            <Typography variant='body1'>San Francisco, CA 94103</Typography>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Privacy;
