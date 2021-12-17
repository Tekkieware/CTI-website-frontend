import makeStyles from '@mui/material/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  movieGrid: {
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
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
