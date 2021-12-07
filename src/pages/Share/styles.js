import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  containerStyle: {
    paddingTop: '96px',
  },
  imageStyle: {
    border: '1px solid',
    borderColor: theme.palette.background.darkGray,
    maxWidth: '100%',
    [theme.breakpoints.down('md')]: {
      fontSize: '36px',
    },
  },
  ctiImageStyle: {
    maxWidth: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '102px',
      height: '62px',
    },
  },
  ctiSquareStyle: {
    maxWidth: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '150px',
      height: '150px',
    },
  },
  starMediaSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  socialMediaSectionStyle: {
    padding: '96px 0 96px',
  },
  mediaInfoStyle: {
    padding: '96px 0 96px',
  },
  card: {
    backgroundColor: '#FFFFFF',
    height: theme.spacing(23),
    width: '100%',
    border: '1px solid',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(0.5),
    borderColor: theme.palette.background.darkGray,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    boxShadow: '0px 6px 30px rgba(4, 45, 95, 0.08)',
  },
  cardTypo: {
    textAlign: 'center',
    width: theme.spacing(27),
  },
  media: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '64px',
    width: '64px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBW: {
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    marginLeft: '0',
    marginTop: '-85px',
    alignItems: 'center',
    boxSizing: 'border-box',
    boxShadow: '0px 6px 30px rgba(4, 45, 95, 0.08)',
  },
  logoColor: {
    overflow: 'visible',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    marginLeft: '-40px',
    marginTop: '85px',
    alignItems: 'center',
    boxSizing: 'border-box',
    boxShadow: '0px 6px 30px rgba(4, 45, 95, 0.08)',
  },
  tweetGrid: {
    paddingTop: '96px',
  },
  twitterFeedStyle: {
    border: '1px solid',
    borderRadius: '4px',
    borderColor: theme.palette.background.darkGray,
    boxShadow: '0px 6px 30px rgba(4, 45, 95, 0.08)',
    width: theme.spacing(80),
  },
  sectionHeadTypography: {
    textAlign: 'center',
    color: theme.palette.spectrum.teal,
  },
  contactLinkStyle: {
    paddingBottom: '40px',
    '& a:visited': {
      color: theme.palette.secondary.main,
    },
  },
  link: {
    width: '100%',
    '& .MuiCardActionArea-focusHighlight': {
      backgroundColor: 'transparent',
    },
  },
}));

export default useStyles;
