import React from 'react';
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import NavBreadcrumbs from "../../components/NavBreadcrumbs.js";
import SearchBar from './SearchBar';
import { TitleSection } from '../../components'

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '20rem',
  },
  containerDefault: {
    minHeight: '30rem',
  },
  link: {
    color: theme.palette.text.secondary,
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const breadCrumbLinks = [
  { href: '/home', name: 'Home' },
  { href: '/search-projects', name: 'Search Projects' },
];

const HeaderSection = ({
  onLinkClick,
  onSearchClick,
  onSearchInput,
  onSearchKeyPress,
  searchQuery,
  showDefault,
}) => {
  const classes = useStyles();
  return (
    <Box className='boxBackground'>
      <Container className={showDefault ? classes.containerDefault : classes.container}>
        <NavBreadcrumbs crumbs={breadCrumbLinks} color='primary' />
        <TitleSection>Search Projects</TitleSection>
        <Grid container justify='center'>
          <Grid item xs={false} sm={1} />
          <Grid item xs={12} sm={9}>
            <SearchBar
              dataCy='search-projects'
              onIconClick={onSearchClick}
              onInput={(e) => onSearchInput(e.target.value)}
              onKeyPress={onSearchKeyPress}
              placeholder='Search the Civic Tech Index'
              value={searchQuery}
            />
          </Grid>
          <Grid item xs={false} sm={1} />
          {!showDefault && (
            <Typography
              variant='body2'
              className={classes.link}
              onClick={onLinkClick}
              data-cy='how-to-improve-your-search-results'
            >
              <u>How to improve your search result</u>
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default HeaderSection;
