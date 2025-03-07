import React from 'react';
import { Link } from 'react-router-dom/';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';

const LinkList = ({ header, links, route }) => {
  const classes = useStyles();

  return (
    <Box style={{ padding: '0px 5px' }}>
      <Typography
        component={Link}
        to={route}
        variant='body2'
        color='textSecondary'
        className={classes.linkTypography}
      >
        {header}
      </Typography>
      {links.map((link) => {
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
    </Box>
  );
};

export default LinkList;
