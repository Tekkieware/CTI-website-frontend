/* eslint-disable max-lines-per-function */
/* eslint-disable complexity */

import React, { useState, useEffect } from 'react';
import { Dropdown } from '../../components/Dropdown';
import { ContributorThumbnail } from '../../components/ContributorThumbnail';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  thumbnailGrid: {
    paddingBottom: '24px',
  },
  affiliatedThumbnailsWrapper: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '10px',
    justifyContent: 'center',
    [theme.breakpoints.between('xs', 'sm')]: {
      marginLeft: '0',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
  },
  afflnThumbnails: {
    height: '64px',
    borderRadius: '6px',
    border: '1px solid',
    borderColor: theme.palette.outline.gray,
    margin: '8px',
    width: '392px',
    [theme.breakpoints.down('lg')]: {
      height: '60px',
    },
    [theme.breakpoints.down('sm')]: {
      height: '36px',
    },
  },
  button: {
    width: '211px',
    height: '44px',
    margin: 'auto',
    borderRadius: '31px',
    border: '1px solid',
    borderColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.dark,
    fontSize: '16px',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
    [theme.breakpoints.down('md')]: {
      width: '74px',
      height: '19px',
      fontSize: '13px',
    },
  },
}));

export const AffiliatedOrganizations = ({
  expandedOrgs,
  filtersActive,
  inputValue,
  onOrgClick,
  organizations, // affiliated orgs
  showIndexContrib,
}) => {
  const classes = useStyles();

  const isChildThumbnail = true;
  let parentdata;
  let parentObj;

  const getParentData = () => {
    parentdata = [];

    organizations.forEach((org) => {
      if (org.depth === 2) {
        org['childNodes'] = [];
        org['allChildrenShown'] = false;
        parentdata.push(org);
      }
      if (org.depth === 3) {
        // console.log(parentdata);
        parentObj = parentdata.find((d) => {
          // console.log(org.path, d.path);
          return org.path.includes(d.path) && d.depth === 2;
        });
        if (parentObj) {
          org['childNodes'] = [];
          org['allChildrenShown'] = false;
          parentObj.childNodes.push(org);
        } else {
          // do we ever get here?
          console.error('XXXX parent of depth 3 node not found');
          // org['childNodes'] = [];
          // org['allChildrenShown'] = false;
          // parentdata.push(org);
        }
      }
      if (org.depth === 4) {
        const grandparentObj = parentdata.find(
          (d) => org.path.includes(d.path) && d.depth === 2
        );

        if (!grandparentObj) {
          console.error('XXXX grandparent of depth 4 node not found');
          console.log(org);
          return;
        }

        // loop through grandparent to find parent
        parentObj = grandparentObj['childNodes'].find((d) =>
          org.path.includes(d.path)
        );

        /*
        // potential parent: common path and one level higher
        // I don't see  how this could find any more than one parent unless
        // there's some data corruption
        mapsearchedChildParent = organizationData.find(
          (d) => org.path.includes(d.path) && d.depth === 3
        );
        // console.log(mapsearchedChildParent);

        // NEW find potential grandparent
        if (!mapsearchedChildParent) {
          console.log('re-search for grandparent');
          mapsearchedChildParent = organizationData.find(
            (d) => org.path.includes(d.path) && d.depth === 2
          );
        } else {
          // see if parent is already included previously. Why?
          const exist = parentdata.find(
            (d) => mapsearchedChildParent.path === d.path
          );

          // set the parent we're going to use
          if (!exist) {
            // parent not found in accumulated list
            // set the potential parent as the parent anyway
            mapsearchedChildParent['childNodes'] = [];
            mapsearchedChildParent['allChildrenShown'] = false;
            parentChildobj = mapsearchedChildParent;
            parentdata.push(mapsearchedChildParent);
            // do we ever get here?
            console.error('XXXX');
            console.log(mapsearchedChildParent);
          } else {
            // set the found parent as parent
            parentChildobj = exist;
          }
        }
        */

        // apply show/hide filter
        // this would probably be more efficient if done to the entire array at
        // once
        if (parentObj) {
          // console.log(parentObj);
          if (showIndexContrib && org['cti_contributor']) {
            parentObj.childNodes.push(org);
          }
          if (!showIndexContrib) {
            parentObj.childNodes.push(org);
          }
        } else {
          // do we ever get here?
          console.error('XXXX');
          // org['childNodes'] = [];
          // org['allChildrenShown'] = false;
          // parentdata.push(org);
        }
      }
    });
    console.log(parentdata);
    return parentdata;
  };

  const [currentThumbnails, setCurrentThumbnails] = useState([]);

  useEffect(() => {
    setCurrentThumbnails(getParentData());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizations]);

  let childSort;
  let childNode;
  if (!filtersActive) {
    return (
      <Grid
        className={classes.thumbnailGrid}
        dropdownlength={currentThumbnails.length}
        data-cy='affiliated-organizations'
      >
        {currentThumbnails.map((org, i) => {
          childSort = org.childNodes;
          childNode = org.allChildrenShown ? childSort : childSort.slice(0, 6);
          return (
            <Dropdown
              checkboxValue={showIndexContrib}
              dropdownLength={org.childNodes.length}
              filtersActive={filtersActive}
              isOpen={expandedOrgs.includes(org.id.toString())}
              key={`affiliatedThumbnailsWrapper_${i}`}
              onClick={onOrgClick}
              organization={org}
            >
              <Grid
                container
                style={{ justifyContent: 'center' }}
                alignItems='center'
              >
                {childNode.length > 0 ? (
                  <Grid
                    item
                    container
                    xs={10}
                    className={classes.affiliatedThumbnailsWrapper}
                  >
                    {childNode.map((child, idx) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={5}
                          lg={5}
                          className={classes.afflnThumbnails}
                          key={`affiliatedThumbnail_child_${i}_${idx}`}
                        >
                          <ContributorThumbnail
                            organization={child}
                            isChildThumbnail={isChildThumbnail}
                            checkboxValue={showIndexContrib}
                            inputValue={inputValue}
                            filtersActive={filtersActive}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                ) : (
                  <ContributorThumbnail
                    isChildThumbnail={isChildThumbnail}
                    organization={org}
                    checkboxValue={showIndexContrib}
                    inputValue={inputValue}
                    filtersActive={filtersActive}
                  />
                )}
                {org.childNodes.length > 6 ? (
                  <Grid
                    item
                    container
                    xs={10}
                    style={{ margin: 'auto', paddingTop: '16px' }}
                  >
                    <Button
                      data-cy='viewBtnClick'
                      id='viewAllButton'
                      className={classes.button}
                      onClick={() => {
                        const data = [...currentThumbnails];
                        data[i].allChildrenShown = !data[i].allChildrenShown;
                        setCurrentThumbnails(data);
                      }}
                    >
                      {currentThumbnails[i].allChildrenShown ? 'View Less' : 'View All'}
                    </Button>
                  </Grid>
                ) : null}
              </Grid>
            </Dropdown>
          );
        })}
      </Grid>
    );
  } else {
    return (
      <Grid
        className={classes.thumbnailGrid}
        data-cy='affiliated-organizations'
      >
        {currentThumbnails.map((org, i) => {
          return (
            <Dropdown
              checkboxValue={showIndexContrib}
              dropdownLength={org.childNodes.length}
              filtersActive={filtersActive}
              isOpen={expandedOrgs.includes(org.id.toString())}
              onClick={onOrgClick}
              key={`affiliatedThumbnailsWrapper_${i}`}
              organization={org}
            >
              <Box className={classes.affiliatedThumbnailsWrapper}>
                {org.childNodes.length === 0 ? (
                  ' '
                ) : (
                  <>
                    {org.childNodes.map((child, idx) => {
                      return (
                        <Typography
                          component='div'
                          className={classes.afflnThumbnails}
                          key={`affiliatedThumbnail_child_${i}_${idx}`}
                        >
                          <ContributorThumbnail
                            organization={child}
                            isChildThumbnail={isChildThumbnail}
                            inputValue={inputValue}
                            filtersActive={filtersActive}
                          />
                        </Typography>
                      );
                    })}
                  </>
                )}
              </Box>
            </Dropdown>
          );
        })}
      </Grid>
    );
  }
};
