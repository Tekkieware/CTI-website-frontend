import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  subHeaderStyle: {
    fontWeight: '400',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '48px 30px',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '48px 100px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '48px 200px',
    },
  },
  frameStyle: {
    border: 'none',
    overflow: 'hidden',
    padding: '0',
    width: '949px',
    height: '629px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
}));

export default useStyles;
