import makeStyles from '@material-ui/core/styles/makeStyles';


const useStyles = makeStyles((theme) => ({
  firstGrid: {
    paddingTop: theme.spacing(8),
    margin: 'auto',
  },
  textAlign:{
    textAlign:'justify',
  },
typoPadding:{
  paddingTop: theme.spacing(2),
  textAlign:'justify',
},
gridHeadingStyle:{
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(3)
},
personalInfoStyle:{
  paddingTop: theme.spacing(4),
},
h4Style:{
  textAlign: 'center',
  color: theme.palette.spectrum.teal,
},
h6Style:{
  color: theme.palette.spectrum.teal,
},
nested: {
  paddingLeft: theme.spacing(4),
},
listItemStyle:{
'&.MuiListItem-root':{
 paddingTop:'0px',
 paddingBottom:'0px',
},
'&.MuiListItem-gutters':{
  paddingLeft:'0px',
}
},
listIconStyle:{
  '&.MuiListItemIcon-root':{
   minWidth:'16px'
  }
  },
  gridSubStyle:{
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    margin:'auto',
  },
  gridMargin:{
    margin:'auto',
  },
  boldFont:{
    fontWeight:'bold',
  },
  gridPadding:{
    paddingTop:theme.spacing(2),
    paddingBottom: theme.spacing(10),
     margin:'auto',
  },
  linkStyle:{
    '& a:visited': {
      color: theme.palette.secondary.main,
    },
  },
  padding:{
    paddingTop:theme.spacing(2),
  },
}));

export default useStyles;
