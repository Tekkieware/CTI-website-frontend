import makeStyles from '@material-ui/core/styles/makeStyles';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  firstGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(3),
    margin: 'auto',
  },
  textAlign:{
    textAlign:'justify',
  },
typoPadding:{
  paddingTop: theme.spacing(2),
  textAlign:'justify',
},
h4Style:{
  paddingTop: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.spectrum.teal,
}
}));

export default useStyles;
