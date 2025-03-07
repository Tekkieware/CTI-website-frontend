import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Link from '../../components/common/Link';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './styles';
import AddOrgForm from './AddOrgForm';

export const OrganizationSelectorSection = ({
  orgName,
  setOrgName,
  options,
  setOptions,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const loading = open && options.length === 0;

  const handleDialogClose = (newOrg) => {
    setDialogOpen(false);
    if (newOrg) {
      setOptions([newOrg, ...options]);
      setOrgName(newOrg);
    }
  };

  const handleOrgChange = (event, value) => {
    if (value !== null) {
      setOrgName(value);
    }
  };

  return (
    <>
      <Grid item xs={12} sm={12}>
        <Typography variant='body1' style={{ padding: '34px 0 8px' }}>
          Which Organization?
        </Typography>
        <Autocomplete
          id='organization'
          style={{ width: '100%' }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          getOptionSelected={(option, value) =>
            value === '' || option === value
          }
          getOptionLabel={(option) => option || ''}
          options={options}
          autoComplete
          loading={loading}
          value={orgName || null}
          onChange={handleOrgChange}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              variant='outlined'
              InputProps={{
                ...params.InputProps,
                placeholder: 'Select an Organization',
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color='inherit' size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </Grid>
      <Grid item style={{ paddingTop: '12px' }}>
        <Typography variant='body1'>
          Don&apos;t see your organization? Click&nbsp;
          <Link id='add-org-link' onClick={() => setDialogOpen(true)}>
            here
          </Link>
          &nbsp;to add it.
        </Typography>
      </Grid>
      <AddOrgForm open={dialogOpen} onClose={handleDialogClose} />
    </>
  );
};

export const OrgNameSection = ({ setDisplayState, orgName, linkStyles }) => {
  const classes = useStyles();
  const handleChangeOrg = () => {
    setDisplayState('');
  };
  return (
    <Grid
      container
      direction='row'
      alignItems='center'
      className={classes.orgNameSectionGrid}
    >
      <Grid item xs={12} sm={3} className={classes.orgGridStyle}>
        <Typography variant='body1'>Affiliated Organization:</Typography>
      </Grid>
      {orgName ? (
        <Grid item xs={10} sm={7}>
          <Typography variant='body1' className={classes.orgTypoStyle}>
            {orgName}
          </Typography>
        </Grid>
      ) : (
        <Grid item xs={7} style={{ paddingRight: '50px' }}>
          <Typography variant='body1' className={classes.orgTypoStyle}>
            Unaffiliated
          </Typography>
        </Grid>
      )}
      <Grid item xs={2}>
        <Typography>
          <Link id='change-org' onClick={handleChangeOrg}>
            change
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export const OrgChange = ({
  value,
  orgName,
  setOrgName,
  setOrgTags,
  changeValue,
  setDisplayState,
}) => {
  const [orgNameError, setOrgNameError] = useState('');
  const handleChangeOrg = () => {
    if (changeValue === 'TopicTag') {
      setDisplayState('TopicTag');
    } else if (changeValue === 'GenerateTags') {
      setDisplayState('GenerateTags');
    } else if (changeValue === 'CopyPasteTags') {
      setDisplayState('CopyPasteTags');
    } else {
      setDisplayState('ProjectUrl');
    }
  };
  // eslint-disable-next-line complexity
  const handleSubmitOrg = () => {
    const topics = [];
    if (value === 'yes' && orgName === '') {
      setOrgNameError('Please select org name');
    } else if (value === 'yes' && orgName !== '') {
      let og = orgName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      og = og.replace(/ /g, '-').toLowerCase();
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/organizations/${og}`)
        .then((res) => {
          const po = res.data.parents;
          if (res.data.org_tag !== '') {
            topics.push(res.data.org_tag);
          }
          if (po.length !== 0) {
            po.map((p) => (p.org_tag !== '' ? topics.push(p.org_tag) : null));
          }
          setOrgTags(topics);
        })
        .catch((e) => {
          /*
           * This should store the error state.
           * Component should check for error state and resolve the correct response.
           */
          console.log(e); // eslint-disable-line no-console
        });
      handleChangeOrg();
    } else if (value === 'no' && orgName === '') {
      handleChangeOrg();
    }
  };
  return (
    <Grid item xs={12} sm={12}>
      <Typography variant='body1' color='error'>
        {orgNameError}
      </Typography>
      <Grid align='center' style={{ padding: '20px' }}>
        <Button onClick={handleSubmitOrg} id='submitButton'>
          {value === 'yes' ? 'Submit Organization' : 'Next'}
        </Button>
      </Grid>
    </Grid>
  );
};
