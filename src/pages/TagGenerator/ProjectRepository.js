import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useStyles from './styles';

export const ProjectRepositorySection = ({
  repositoryUrl,
  setDisplayState,
  linkStyles,
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction='row'
      alignItems='center'
      className={classes.projRepoGrid}
    >
      <Grid item xs={12} sm={3} className={classes.projGridStyle}>
        <Typography variant='body1'>Project Repository URL:</Typography>
      </Grid>
      <Grid item xs={10} sm={7} data-cy='grid-repository-url'>
        <Link
          variant='body1'
          href={repositoryUrl}
          className={classes.projTypoStyle}
        >
          {repositoryUrl}
        </Link>
      </Grid>
      <Grid item xs={2}>
        <Link
          id='change-url'
          component='button'
          variant='body1'
          onClick={() => setDisplayState('ProjectUrl')}
          underline='always'
          style={linkStyles}
        >
          change
        </Link>
      </Grid>
    </Grid>
  );
};

export const ProjectRepositoryInput = ({
  handleEnter,
  repositoryUrl,
  setRepositoryUrl,
  topicSearchError,
  setTopicSearchError,
  handleSubmit,
}) => {
  const handleChange = (e) => {
    setRepositoryUrl(e.target.value);
    setTopicSearchError('');
  };
  return (
    <>
      <Grid item style={{ padding: '16px 0px' }} xs={12}>
        <Typography variant='body1'>GitHub Project Repository URL</Typography>
      </Grid>
      <Grid data-cy='grid-repository'>
        <TextField
          id='repository-url'
          onKeyPress={handleEnter}
          value={repositoryUrl}
          onChange={handleChange}
          variant='outlined'
          placeholder='https://github.com/hackforla/example'
          fullWidth
        />
      </Grid>
      <Grid style={{ paddingTop: '10px' }}>
        <Typography variant='body1' color='error'>
          {topicSearchError}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        style={{ padding: '20px', width: '100%', margin: '0 auto' }}
      >
        <Grid align='center'>
          <Button onClick={handleSubmit} id='projectButton'>
            Submit Your Project Repository
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
