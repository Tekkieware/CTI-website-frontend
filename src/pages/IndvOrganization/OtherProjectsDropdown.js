import React,{ useState }  from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLessRounded';
import ExpandMore from '@mui/icons-material/ExpandMoreRounded';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import { makeStyles } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  list: {
    minHeight: '72px',
    marginTop: '32px',
    backgroundColor: theme.palette.background.paper,
  },
  dropdownBtnStyle: {
    minHeight: '72px',
  },
  dropdownTitleStyle: {
    fontWeight: '700',
    fontFamily: 'Work Sans',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#0F1D2F',
  },
  dropdownOptionLinkStyle: {
    fontWeight: '700',
    fontFamily: 'Work Sans',
    fontSize: '16px',
    color: '#0D99C6',
    fontStyle: 'normal',
    lineHeight: '21px',
  },
}));
export const OtherProjectsDropdown = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List dense disablePadding className={classes.list}>
      <ListItem
        button
        data-cy='other-repo-dropdown'
        onClick={handleClick}
        className={classes.dropdownBtnStyle}
      >
        <ListItemText
          primary={
            <Typography className={classes.dropdownTitleStyle}>
              {props.dropdownTitle}
            </Typography>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout='auto'>
        {props.dropDownListItem.length !== 0 ? (
          props.dropDownListItem
        ) : (
          <a href='/#' className={classes.dropdownOptionLinkStyle}>
            No Project Url Found.
          </a>
        )}
      </Collapse>
    </List>
  );
};
