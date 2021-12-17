import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import useStyles from './styles';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Complete = ({ onClose }) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.complete}>
        <Typography variant='subtitle1'><b>Complete!</b></Typography>
      </Box>
      <Box textAlign='center'>
        <LinearProgress variant='determinate' color='secondary' value={100} />
        <CheckCircleIcon className={classes.icon} />
        <Typography variant='h1' className={classes.infoLarge}>
          You&apos;re all set!
        </Typography>
        <Typography variant='h1' className={classes.infoLarge}>
          Thanks for contributing.
        </Typography>
        <Box className={classes.return}>
          <Button data-cy='return-button' onClick={onClose}>Return to Tag Generator</Button>
        </Box>
      </Box>
    </>
  );
};

export default Complete;
