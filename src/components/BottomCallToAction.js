import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles, useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  typoHeading: {
    textAlign: 'center',
    marginBottom: '12px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.75rem',
    },
  },
}));

const defaultBackgroundColor = 'transparent'; // see https://developer.mozilla.org/en-US/docs/Web/CSS/background-color - 'transparent' is initial value
const defaultButtonHref = 'mailto:civictechindex@hackforla.org';
const defaultButtonText = 'Contact Us';

const BottomCallToAction = ({
  color,
  buttonHref = defaultButtonHref,
  buttonText = defaultButtonText,
  heading,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  let bgColor = defaultBackgroundColor;
  if (color === 'primary') {
    bgColor = theme.palette.background.default;
  }
  const boxStyle = {
    backgroundColor: bgColor,
  };

  return (
    <Box style={boxStyle} py={8} mx={-3}>
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
      >
        <Grid item>
          <Typography variant='h3' className={classes.typoHeading}>
            {heading}
          </Typography>
        </Grid>
        <Grid item>
          <Button href={buttonHref}>{buttonText}</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BottomCallToAction;
