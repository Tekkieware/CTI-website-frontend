import React, { useState } from 'react';
import { Link } from 'react-router-dom/';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandLessRounded from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import useStyles from './styles';

const DropdownList = ({ header, links, route }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const toggleList = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box className={classes.dropdownHeader} onClick={links.length ? toggleList : null}>
        <Typography
          variant='body2'
          color='textSecondary'
          component={Link}
          to={route}
        >{header}
        </Typography>
        {links.length > 0 && (open ? <ExpandLessRounded /> : <ExpandMoreRounded />)}
      </Box>
      {open &&
        links.map((link) => {
          return link.isExternal ? (
            <a key={link.id} href={link.route}>{link.header}</a>
          ) : (
            <Link key={link.id} to={link.route}>{link.header}</Link>
          );
        })
      }
    </>
  );
};

export default DropdownList;
