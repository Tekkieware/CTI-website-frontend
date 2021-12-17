import React from 'react';
import makeStyles from '@mui/material/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  titleStyle: {
    color: (props) => {
      if (props.textVariant === 'black') {
        return theme.palette.primary.main
      } else {
        return theme.palette.warning.main
      }
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '40px',
    },
    textAlign: 'center',
  },
}));

/**
 * Getting Started Call to Action typically right above the footer.
 * @param {*} props.children
 * @param {*} props.textVariant
 */
const HeaderTitle = (props) => {
  const classes = useStyles(props);
  const title = props.children;

  return (
    <Grid container>
      <Grid item xs={1} md={2} />
      <Grid item xs={10} md={8}>
        <Typography variant='h1' className={classes.titleStyle}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={1} md={2} />
    </Grid>
  );
};

export default HeaderTitle;
