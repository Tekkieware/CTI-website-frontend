/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { DropdownArrow } from '../../components/DropdownArrow.js';
import Grid from '@material-ui/core/Grid';
import { AffiliatedOrganizations } from './AffiliatedOrganizations';
import clsx from 'clsx';
import Link from '../../components/common/Link';
import { makeStyles } from '@material-ui/core/styles';
import spectrum from '../../theme-spectrum';

// eslint-disable-next-line max-lines-per-function
const useStyles = makeStyles((theme) => ({
  titleStyle: {
    color: spectrum.teal,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '13px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '28px',
    },
  },
  gpGrid: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 'auto',
    backgroundColor: spectrum.white,
    borderRadius: '6px',
    padding: '8px 16px',
    '& h4': {
      paddingLeft: '10px',
      color: spectrum.teal,
      [theme.breakpoints.between('xs', 'sm')]: {
        fontSize: '15px',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '18px',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '24px',
        paddinglLeft: '10px',
      },
    },
    '& a:link': {
      color: `${spectrum.teal} !important`,
      textDecoration: 'none',
    },
    '& a:visited': {
      color: `${spectrum.teal} !important`,
    },
    '& a:hover': {
      textDecoration: 'underline',
    },
    [theme.breakpoints.down('sm')]: {
      height: '43px',
    },
  },
  open: {
    backgroundColor: spectrum.teal,
    '& h4': {
      color: `${spectrum.white} !important`,
    },
    '& a:link': {
      color: `${spectrum.white} !important`,
    },
    '& a:visited': {
      color: `${spectrum.white} !important`,
    },
  },
  flexGrid: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  codeforAllIcon: {
    [theme.breakpoints.down('sm')]: {
      width: '30px',
      height: '30px',
    },
  },
  codeforallText: {
    fontSize: '24px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '12px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '18px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '24px',
    },
  },
  dropDownGrid: {
    margin: 'auto',
    backgroundColor: spectrum.white,
    padding: '1px 0px',
  },
  contributorIcon: {
    marginTop: '24%',
    width: '42px',
    height: '42px',
    marginLeft: '29%',
    [theme.breakpoints.down('sm')]: {
      width: '23px',
      height: '23px',
    },
  },
  contributorItem: {
    display: 'grid',
    justifyContent: 'right',
    marginRight: '2%',
    marginTop: '18%',
  },
}));
/* eslint complexity: [0, 0]*/
export const Affiliated = ({
  affiliatedCount,
  classes,
  expandedOrgs,
  inputValue,
  onOrgClick,
  organizations,
  organizationData,
  filtersActive,
  totalAffiliatedCount,
  showIndexContrib,
}) => {
  const classesLocal = useStyles();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    if ((filtersActive || expandedOrgs.length) && organizations.length) {
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
    }
  }, [expandedOrgs, filtersActive, organizations])

  return (
    <Grid>
      <Grid style={{ padding: '40px' }}>
        <Typography variant='h4' className={classesLocal.titleStyle}>
          Affiliated Organizations
          <span style={{ paddingLeft: '9px' }}>
            {filtersActive
              ? `(${affiliatedCount}/${totalAffiliatedCount})`
              : `(${totalAffiliatedCount})`}
          </span>
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={10}
        className={clsx(classesLocal.gpGrid, {
          [classesLocal.open]: dropdownOpen,
        })}
      >
        <Grid>
          <img
            src='/images/code_for_All.png'
            alt='code for all logo'
            className={classesLocal.codeforAllIcon}
          />
        </Grid>
        <Grid>
          <Typography
            variant='h4'
            noWrap
            className={classesLocal.codeforallText}
          >
            <Link
              href='/organization/code-for-all'
              rel='noreferrer noopener'
            >
              Code for All
            </Link>
            <span style={{ paddingLeft: '5px' }}>
              {filtersActive
                ? `(${affiliatedCount}/${totalAffiliatedCount})`
                : ` (${totalAffiliatedCount})`}
            </span>
          </Typography>
        </Grid>
        <Grid>
          {showIndexContrib ? (
            <Typography>
              <img
                alt='contributor-icon'
                data-cy='contributor-icon'
                className={classesLocal.contributorIcon}
                src='/images/Gparent_contributed.svg'
              />
            </Typography>
          ) : (
            ' '
          )}
        </Grid>
        <Grid
          item
          container
          className={classesLocal.flexGrid}
          data-cy='code-for-all-chevron'
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <DropdownArrow
            open={dropdownOpen}
            handleArrow={() => setDropdownOpen(!dropdownOpen)}
          />
        </Grid>
      </Grid>
      <Grid>
        {dropdownOpen &&
          (!organizations ? (
            !inputValue ? (
              <h3 className={classes.loaders}>Loading...</h3>
            ) : (
              <h3 className={classes.loaders}>No Results</h3>
            )
          ) : (
            <Grid item xs={12} sm={10} className={classesLocal.dropDownGrid}>
              <AffiliatedOrganizations
                expandedOrgs={expandedOrgs}
                filtersActive={filtersActive}
                inputValue={inputValue}
                onOrgClick={onOrgClick}
                organizationData={organizationData}
                organizations={organizations}
                showIndexContrib={showIndexContrib}
              />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default Affiliated;
