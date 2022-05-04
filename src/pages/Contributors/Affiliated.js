/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Dropdown } from '../../components/Dropdown';
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
  const [orgTree, setOrgTree] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    if ((filtersActive || expandedOrgs.length) && organizations.length) {
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
    }
  }, [expandedOrgs, filtersActive, organizations]);

  const getParentData = () => {
    const parentdata = [];
    let parentObj;

    organizations.forEach((org) => {
      if (org.depth === 2) {
        org['childNodes'] = [];
        parentdata.push(org);
      }
      if (org.depth === 3) {
        parentObj = parentdata.find((d) => {
          return org.path.includes(d.path) && d.depth === 2;
        });
        if (parentObj) {
          org['childNodes'] = [];
          parentObj.childNodes.push(org);
        } else {
          // do we ever get here?
          console.error('XXXX parent of depth 3 node not found');
        }
      }
      if (org.depth === 4) {
        let grandparentObj = parentdata.find(
          (d) => org.path.includes(d.path) && d.depth === 2
        );

        if (!grandparentObj) {
          if (!showIndexContrib) {
            console.error('XXXX grandparent of depth 4 node not found');
            console.log(org);
            return;
          }

          // this could happen when filtering on contributors. The parents won't
          // be listed as contributors and need to be retrived from
          // organizationData

          // find grandparent of depth 2 and add to parentdata
          grandparentObj = organizationData.find(
            (d) => org.path.includes(d.path) && d.depth === 2
          );
          if (!grandparentObj) {
            console.error(
              'XXXX grandparent of depth 2 node not found in organizationData'
            );
            return;
          }
          grandparentObj['childNodes'] = [];
          parentdata.push(grandparentObj);

          // find parent of depth 3 and assign as child of grandparent
          const parent = organizationData.find(
            (d) => org.path.includes(d.path) && d.depth === 3
          );
          if (!parent) {
            console.error(
              'XXXX parent of depth 3 node not found in organizationData'
            );
            return;
          }
          parent['childNodes'] = [];
          grandparentObj.childNodes.push(parent);
        }

        // loop through grandparent to find parent
        parentObj = grandparentObj['childNodes'].find((d) =>
          org.path.includes(d.path)
        );

        if (!parentObj) {
          // do we ever get here?
          console.error('XXXX parent of depth 3 not found in grandparentObj');
        } else {
          parentObj.childNodes.push(org);
        }
      }
    });
    return parentdata;
  };

  useEffect(() => {
    setOrgTree(getParentData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizations]);

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
      {orgTree.map((org, i) => (
        <div key={org.path}>
          <Dropdown
            checkboxValue={showIndexContrib}
            dropdownLength={org.childNodes.length}
            filtersActive={filtersActive}
            isOpen={expandedOrgs.includes(org.id.toString())}
            key={`affiliatedThumbnailsWrapper_${i}`}
            onClick={onOrgClick}
            organization={org}
          >
            {!organizations ? (
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
                  orgTree={org.childNodes}
                  setOrgTree={setOrgTree}
                  showIndexContrib={showIndexContrib}
                />
              </Grid>
            )}
          </Dropdown>
        </div>
      ))}
    </Grid>
  );
};

export default Affiliated;
