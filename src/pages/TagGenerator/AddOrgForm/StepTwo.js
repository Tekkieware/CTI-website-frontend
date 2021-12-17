import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useStyles from './styles';
import CountrySelect from './CountrySelect';

// eslint-disable-next-line max-lines-per-function
const StepTwo = (props) => {
  const classes = useStyles();
  const facebookUrlApiErr = props.apiErrors.facebook_url;
  const twitterUrlApiErr = props.apiErrors.twitter_url;
  const meetupUrlApiErr = props.apiErrors.meetup_url;
  return (
    <>
      <DialogTitle>
        <Box textAlign='center'>
          <Typography variant='h2' className={classes.infoLarge}>
            Add Organization to the Civic Tech Index
          </Typography>
        </Box>
        <Box className={classes.progress}>
          <Typography variant='body1'>Social Media and Location</Typography>
          <Typography variant='body1'>
            <b>2/2</b>
          </Typography>
        </Box>
        <LinearProgress variant='determinate' color='secondary' value={100} />
      </DialogTitle>
      <DialogContent>
        <Typography variant='h5' className={classes.heading}>
          Social Media URL{' '}
          <Box component='span' fontWeight='normal'>
            (optional)
          </Box>
        </Typography>
        <TextField
          className={classes.field}
          data-cy='org-facebook-input'
          error={!!facebookUrlApiErr}
          helperText={facebookUrlApiErr}
          label='Facebook URL'
          onChange={(event) => {
            props.onFacebookUrl(event.target.value);
            props.setApiErrors({ ...props.apiErrors, facebook_url: '' });
          }}
          placeholder='https://facebook.com/example...'
          value={props.facebookUrl}
        />
        <TextField
          className={classes.field}
          data-cy='org-twitter-input'
          error={!!twitterUrlApiErr}
          helperText={twitterUrlApiErr}
          label='Twitter URL'
          placeholder='https://twitter.com/example...'
          onChange={(event) => {
            props.onTwitterUrl(event.target.value);
            props.setApiErrors({ ...props.apiErrors, twitter_url: '' });
          }}
          value={props.twitterUrl}
        />
        <TextField
          className={classes.field}
          data-cy='org-meetup-input'
          error={!!meetupUrlApiErr}
          helperText={meetupUrlApiErr}
          label='Meetup URL'
          onChange={(event) => {
            props.onMeetupUrl(event.target.value);
            props.setApiErrors({ ...props.apiErrors, meetup_url: '' });
          }}
          placeholder='http://meetup.com/example...'
          value={props.meetupUrl}
        />
        <Typography variant='h5' className={classes.heading}>
          Location{' '}
          <Box component='span' fontWeight='normal'>
            (optional)
          </Box>
        </Typography>
        <TextField
          className={classes.field}
          data-cy='org-city-input'
          label='City'
          onChange={(event) => {
            props.onCity(event.target.value);
          }}
          value={props.city}
        />
        <TextField
          className={classes.field}
          data-cy='org-state-input'
          label='State'
          onChange={(event) => {
            props.onStateProvCo(event.target.value);
          }}
          value={props.stateProvCo}
        />
        <CountrySelect
          country={props.country}
          onChange={props.onCountryChange}
        />
      </DialogContent>
      <DialogActions>
        <Box className={classes.buttons}>
          <Button
            variant='contained'
            color='default'
            data-cy='back-button'
            onClick={props.onPrev}
          >
            Back
          </Button>
          <Tooltip
            title='Once your org is submitted, you can return to the Tag Generator and add it to the CTI.'
            aria-label='submit'
          >
            <Button
              variant='contained'
              color='secondary'
              data-cy='submit-button'
              onClick={props.onSubmit}
            >
              Submit
            </Button>
          </Tooltip>
        </Box>
      </DialogActions>
    </>
  );
};

export default StepTwo;
