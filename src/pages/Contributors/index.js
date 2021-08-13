/* eslint-disable max-lines-per-function */
/* eslint-disable complexity */
/* eslint-disable sort-keys */

import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import NavBreadcrumbs from "../../components/NavBreadcrumbs";
import { useStyle } from "./styles.js";
import GetStartedCard from '../../components/GetStartedCard'
import { TitleSection } from '../../components'
import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Affiliated  } from "./Affiliated";
import { UnaffiliatedOrganizations } from "./UnaffiliatedOrganizations";
import OrganizationSearch from "./OrganizationSearch";

// eslint-disable-next-line
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ padding :'24px 0 24px 0' }}>
          <Box>{children}</Box>
        </Box>
      )}
    </Grid>
  );
}



export default function Contributors({ match }) {

  const classes = useStyle();
  const location = useLocation();
  const searchaffiliation = match.params.searchaffiliation;

  const [affiliatedCount, getaffiliatedCount] = useState(0);
  const [affiliatedOrganizationsObject, setAffiliatedOrganizationsObject] = useState({});
  const [showIndexContrib, setShowIndexContrib] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [organizationData, getOrganizationData] = useState([]);
  const [organizationNamesList, setOrganizationNamesList] = useState([]);
  const [searchCount, setsearchCount] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [unaffiliatedCount, getunaffiliatedCount] = useState(0);


  let count1 =0, count2 =0,totalaffiliatedCount=0,totalunaffiliatedCount=0;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/api/organizations/`)
      const organization = result.data;
      const sorted = organization.sort((a, b) => a.id - b.id);
      setOrganizations(sorted);
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
    const createAffiliatedOrganizations = () =>
    {
      const input = inputValue.toLowerCase().replace(/\s/g, "");
      const affiliated = Object.create(null);
      // iterate through the json response
      const names = [];
      const addToAffiliated = (organization) => {
        if (!affiliated["Code for All"]) {
          affiliated["Code for All"] = [];
        }
        if (affiliated["Code for All"])
        {
          affiliated["Code for All"].push(organizations[organization.id - 2]);
          affiliated[organization.name] = [organization];
        }
      };

      const addToUnaffiliated = (organization) => {
        if (affiliated["unaffiliated"]) {
          affiliated["unaffiliated"].push(organization);
        }
        else {
          affiliated["unaffiliated"] = [organization];
        }
      };


      for (const org of organizations)
      {
        names.push(org.name);
        const orgName = org.name.toLowerCase().replace(/\s/g, "");
        if (!inputValue || orgName.includes(input))
        {
          if (org.affiliated === false)
          {
            count1++;
            addToUnaffiliated(org);
          }
          else if (org.affiliated === true)
          {
            count2++;
            addToAffiliated(org);
          }
        }
        getOrganizationData(organizations);
      }


      if (count1 !== 0 || count2 !== 0)
      {
        if (inputValue !== '')
        {
          getunaffiliatedCount(count1);
          getaffiliatedCount(count2);
          setsearchCount(true);
        }
      }
      setAffiliatedOrganizationsObject(affiliated);
      setOrganizationNamesList(names.sort());
    };
    createAffiliatedOrganizations();
  }, [organizations, inputValue, count1,count2,searchaffiliation,organizationData,searchCount,unaffiliatedCount,affiliatedCount]);


  if (organizationData.length >0)
  {
    for (const orgdata of organizationData)
    {
      if (orgdata.depth  === 3 || orgdata.depth === 4)
      {
        totalaffiliatedCount++;
      }
      if (orgdata.depth  === 2 && orgdata.name !== 'Code for All')
      {
        totalunaffiliatedCount++;
      }
    }
  }

  // Tab Code

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  // eslint-disable-next-line
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  return (
    <Box className='pageContainer'>
      <Box className='containerDefault'>
        <Container className={classes.firstSectionWrapper}>
          <NavBreadcrumbs
            crumbs={[
              { name: "Home", href: "/home" },
              { name: "Civic Tech Partners", href: "/organizations/all" },
            ]}
          />
          <Grid container>
            <TitleSection>Organizations</TitleSection>
            <Grid item xs={12}>
              <Typography color='textSecondary' className={classes.textStyle} gutterBottom>Check out our partners who have contributed to the Civic Tech Index</Typography>
            </Grid>
            <Grid item xs={12}>
              <OrganizationSearch
                options={organizationNamesList}
                inputValue={inputValue}
                setInputValue={setInputValue}
                inputPlaceholder="Search for an organization"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className='containerGray'>
        <Container>
          <AppBar position="static" color="default" elevation={0}>
            <Tabs
              value={tabValue}
              onChange={(e, val) => setTabValue(val)}
              variant="fullWidth"
              className={classes.tabs}
              classes={{ indicator: classes.indicator }}
            >
              <Tab label={<>({totalunaffiliatedCount + totalaffiliatedCount })</>} icon="All" {...a11yProps(0)} classes={{ root: classes.tabRoot, selected: classes.tabSelected }} />
              <Tab  icon="Unaffiliated"  label={<>({affiliatedOrganizationsObject["unaffiliated"] ? affiliatedOrganizationsObject["unaffiliated"].length : 0})</>} classes={{ root: classes.tabRoot, selected: classes.tabSelected }} {...a11yProps(1)} />
              <Tab  icon="Affiliated" label={<>({totalaffiliatedCount})</>} classes={{ root: classes.tabRoot, selected: classes.tabSelected }} {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <Grid index={tabValue}>
            <FormGroup className={classes.checkBox}>
              <FormControlLabel
                control={
                  <Checkbox className={classes.chkBoxStyle}
                    onChange={(e) => {setShowIndexContrib(e.target.checked)}} checked={showIndexContrib}
                    style={{ backgroundColor: 'transparent' }}
                  />
                }
                label={<Typography className={classes.formControlLabel}>Index Contributor</Typography>} />
            </FormGroup>

            <TabPanel value={tabValue} index={0}>
              <UnaffiliatedOrganizations
                organization={affiliatedOrganizationsObject["unaffiliated"]}
                searchCount={searchCount}
                unaffiliatedCount={unaffiliatedCount}
                totalunaffiliatedCount={totalunaffiliatedCount}
                checkboxValue={showIndexContrib}
              />
              <Affiliated
                organizations={affiliatedOrganizationsObject}
                inputValue={inputValue}
                classes={classes}
                affiliation="affiliated"
                organizationData={organizationData}
                searchCount={searchCount}
                affiliatedCount={affiliatedCount}
                totalaffiliatedCount={totalaffiliatedCount}
                checkboxValue={showIndexContrib}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <UnaffiliatedOrganizations
                organization={affiliatedOrganizationsObject["unaffiliated"]}
                searchCount={searchCount}
                unaffiliatedCount={unaffiliatedCount}
                totalunaffiliatedCount={totalunaffiliatedCount}
                checkboxValue={showIndexContrib}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <Affiliated
                organizations={affiliatedOrganizationsObject}
                inputValue={inputValue}
                classes={classes}
                affiliation="affiliated"
                organizationData={organizationData}
                searchCount={searchCount}
                affiliatedCount={affiliatedCount}
                totalaffiliatedCount={totalaffiliatedCount}
                checkboxValue={showIndexContrib}
              />
            </TabPanel>
          </Grid>
        </Container>

      </Box>

      <Box className='containerWhite'>
        <Container>
          <GetStartedCard
            headerTitle='Want to add your organization?'
            buttonText='Tag your project'
            buttonHref='/taggenerator'
          />
        </Container>
      </Box>
    </Box>
  );
}
