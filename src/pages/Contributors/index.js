/* eslint-disable max-lines-per-function */
/* eslint-disable complexity */

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import NavBreadcrumbs from '../../components/NavBreadcrumbs';
import { useStyle } from './styles.js';
import GetStartedCard from '../../components/GetStartedCard';
import { TitleSection } from '../../components';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Affiliated } from './Affiliated';
import { UnaffiliatedOrganizations } from './UnaffiliatedOrganizations';
import OrganizationSearch from './OrganizationSearch';

// eslint-disable-next-line
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ padding: '24px 0 24px 0' }}>
          <Box>{children}</Box>
        </Box>
      )}
    </Grid>
  );
}

export default function Contributors() {
  const classes = useStyle();
  const location = useLocation();
  const [affiliatedCount, setAffiliatedCount] = useState(0);
  const [searchAfflTotalCount, setsearchAfflTotalCount] = useState(0);
  const [searchUnafflTotalCount, setsearchUnafflTotalCount] = useState(0);
  const [unaffiliatedOrganizationsObject, setUnaffiliatedOrganizationsObject] =
    useState([]);
  const [affiliatedObject, setaffiliatedObject] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const [organizationNames, setOrganizationNames] = useState([]);
  const [filtersActive, setFiltersActive] = useState(false);
  const [showIndexContrib, setShowIndexContrib] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [totalAffiliatedCount, setTotalAffiliatedCount] = useState(0);
  const [totalUnaffiliatedCount, setTotalUnaffiliatedCount] = useState(0);
  const [unaffiliatedCount, setUnaffiliatedCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/organizations/`
      );
      const sortedOrgs = result.data.sort((a, b) => a.name - b.name);
      sortedOrgs.forEach((org) => {
        if (org.depth === 3) {
          const childNodes = sortedOrgs.filter(
            (item) =>
              item.depth === 4 &&
              item.path.substring(0, 12).includes(org.path.substring(0, 12))
          );
          org['totalCount'] = childNodes.length;
        }
      });
      const names = [];
      let totalAfflCount = 0;
      let totalUnafflCount = 0;
      for (const org of sortedOrgs) {
        names.push(org.name);
        if (org.name.toLowerCase() !== 'code for all') {
          if (org.affiliated) {
            totalAfflCount++;
          } else {
            totalUnafflCount++;
          }
        }
      }
      setOrganizations(sortedOrgs);
      setOrganizationNames(names.sort());
      setTotalAffiliatedCount(totalAfflCount);
      setTotalUnaffiliatedCount(totalUnafflCount);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (location.pathname.indexOf('unaffiliated') > -1) {
      setTabValue(1);
    } else if (location.pathname.indexOf('affiliated') > -1) {
      setTabValue(2);
    }
    if (location.query) {
      setShowIndexContrib(location.query.contributor);
    }
  }, [location]);

  useEffect(() => {
    let afflCount = 0,
      searchAfflCount = 0,
      searchUnafflCount = 0,
      unafflCount = 0;
    const createAffiliatedOrganizations = () => {
      const input = inputValue.toLowerCase().replace(/\s/g, '');
      const affiliated = [];
      const unaffiliated = [];
      for (const org of organizations) {
        if ((showIndexContrib && org.cti_contributor) || !showIndexContrib) {
          const orgName = org.name.toLowerCase().replace(/\s/g, '');
          if (
            (!inputValue || orgName.includes(input)) &&
            orgName.toLowerCase() !== 'code for all'
          ) {
            if (org.affiliated && org.depth !== 2) {
              if (inputValue || showIndexContrib) {
                searchAfflCount++;
              }
              afflCount++;
              affiliated.push(org);
            } else if (!org.affiliated) {
              if (inputValue) {
                searchUnafflCount++;
              }
              unafflCount++;
              unaffiliated.push(org);
            }
          }
        }
      }
      setFiltersActive(!!input || showIndexContrib);
      setUnaffiliatedCount(unafflCount);
      setAffiliatedCount(afflCount);
      setsearchAfflTotalCount(searchAfflCount);
      setsearchUnafflTotalCount(searchUnafflCount);
      setaffiliatedObject(affiliated);
      setUnaffiliatedOrganizationsObject(unaffiliated);
    };
    createAffiliatedOrganizations();
  }, [inputValue, organizations, showIndexContrib]);
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  // eslint-disable-next-line
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  return (
    <Box className='pageContainer'>
      <Box className='containerDefault'>
        <Container className={classes.firstSectionWrapper}>
          <NavBreadcrumbs
            crumbs={[
              { name: 'Home', href: '/home' },
              { name: 'Index Contributors', href: '/organizations/all' },
            ]}
          />
          <Grid container>
            <TitleSection>Index Contributors</TitleSection>
            <Grid item xs={12}>
              <Typography
                color='textSecondary'
                className={classes.textStyle}
                gutterBottom
              >
                View all Civic Tech Organizations with open-source repositories.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <OrganizationSearch
                options={organizationNames}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className='containerGray'>
        <Container>
          <AppBar position='static' color='default' elevation={0}>
            <Tabs
              value={tabValue}
              onChange={(e, val) => setTabValue(val)}
              variant='fullWidth'
              className={classes.tabs}
              classes={{ indicator: classes.indicator }}
            >
              <Tab
                icon='All'
                label={
                  <>
                    {inputValue || showIndexContrib
                      ? `(${searchUnafflTotalCount + searchAfflTotalCount})`
                      : ` (${totalAffiliatedCount + totalUnaffiliatedCount})`}
                  </>
                }
                {...a11yProps(0)}
                classes={{
                  root: classes.tabRoot,
                  selected: classes.tabSelected,
                }}
              />
              <Tab
                icon='Unaffiliated'
                label={
                  <>
                    {' '}
                    (
                    {unaffiliatedOrganizationsObject
                      ? unaffiliatedOrganizationsObject.length
                      : 0}
                    )
                  </>
                }
                classes={{
                  root: classes.tabRoot,
                  selected: classes.tabSelected,
                }}
                {...a11yProps(1)}
              />
              <Tab
                icon='Affiliated'
                label={
                  <>
                    {inputValue || showIndexContrib
                      ? `(${searchAfflTotalCount})`
                      : ` (${totalAffiliatedCount})`}
                  </>
                }
                classes={{
                  root: classes.tabRoot,
                  selected: classes.tabSelected,
                }}
                {...a11yProps(2)}
              />
            </Tabs>
          </AppBar>
          <Grid index={tabValue}>
            <FormGroup className={classes.checkBox}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showIndexContrib}
                    data-cy='index-contributors-checkbox'
                    onChange={(e) => {
                      setShowIndexContrib(e.target.checked);
                    }}
                  />
                }
                label={
                  <Typography className={classes.formControlLabel}>
                    Index Contributor
                  </Typography>
                }
              />
            </FormGroup>
            <TabPanel value={tabValue} index={0}>
              <UnaffiliatedOrganizations
                organization={unaffiliatedOrganizationsObject}
                filtersActive={filtersActive}
                unaffiliatedCount={unaffiliatedCount}
                totalunaffiliatedCount={totalUnaffiliatedCount}
                showIndexContrib={showIndexContrib}
              />
              <Affiliated
                organizations={affiliatedObject}
                inputValue={inputValue}
                classes={classes}
                affiliation='affiliated'
                organizationData={organizations}
                filtersActive={filtersActive}
                affiliatedCount={affiliatedCount}
                totalaffiliatedCount={totalAffiliatedCount}
                searchAfflTotalCount={searchAfflTotalCount}
                showIndexContrib={showIndexContrib}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <UnaffiliatedOrganizations
                organization={unaffiliatedOrganizationsObject}
                filtersActive={filtersActive}
                unaffiliatedCount={unaffiliatedCount}
                totalunaffiliatedCount={totalUnaffiliatedCount}
                showIndexContrib={showIndexContrib}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <Affiliated
                organizations={affiliatedObject}
                inputValue={inputValue}
                classes={classes}
                affiliation='affiliated'
                organizationData={organizations}
                filtersActive={filtersActive}
                affiliatedCount={affiliatedCount}
                totalaffiliatedCount={totalAffiliatedCount}
                searchAfflTotalCount={searchAfflTotalCount}
                showIndexContrib={showIndexContrib}
              />
            </TabPanel>
          </Grid>
        </Container>
      </Box>
      <Box className='containerWhite'>
        <Container>
          <GetStartedCard
            headerTitle='Want to add your organization?'
            buttonText='Add Your Project'
            buttonHref='/taggenerator'
          />
        </Container>
      </Box>
    </Box>
  );
}
