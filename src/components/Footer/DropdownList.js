import React, { useState } from 'react';
import { Link } from 'react-router-dom/';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ExpandLessRounded from '@material-ui/icons/ExpandLessRounded';
import ExpandMoreRounded from '@material-ui/icons/ExpandMoreRounded';
import useStyles from './styles';

const DropdownList = ({ header, links, route }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const toggleList = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box
        className={classes.dropdownHeader}
        onClick={links.length ? toggleList : null}
      >
        <Typography
          variant='body2'
          color='textSecondary'
          component={Link}
          to={route}
        >
          {header}
        </Typography>
        {links.length > 0 &&
          (open ? <ExpandLessRounded /> : <ExpandMoreRounded />)}
      </Box>
      {open &&
        links.map((link) => {
          return link.isExternal ? (
            <a
              aria-label={link.label}
              key={link.id}
              href={link.route}
              title={link.tooltip}
            >
              {link.header}
            </a>
          ) : (
            <Link
              aria-label={link.label}
              key={link.id}
              to={{ pathname: link.route, query: link.query }}
              title={link.tooltip}
            >
              {link.header}
            </Link>
          );
        })}
    </>
  );
};

export default DropdownList;
