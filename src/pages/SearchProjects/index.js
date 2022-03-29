/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FilterSelector from './FilterSelector';
import FilterTag from './FilterTag';
import HeaderSection from './HeaderSection';
import HelpModal from './HelpModal';
import ProjectCard from '../../components/ProjectCard';
import ResultFilters from './ResultFilters';
import ResultHeader from './ResultHeader';
import ResultContainer from './ResultContainer';
import defaultSearchFilterList from './searchFilterList';

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  empty: {
    backgroundColor: theme.palette.background.primary,
    minHeight: '10rem',
  },
  resultSection: {
    alignSelf: 'flex-start',
  },
  projectCardBorder: {
    border: '1px solid #BCBCBC',
  },
}));

const renderCard = (project, affiliations, classes) => {
  const affiliationTags = [];
  const topicTags = [];
  const calculateDaysSince = (updateTime) => {
    const days = new Date() - new Date(updateTime);
    return Math.round(days / (1000 * 3600 * 24));
  };

  project.topics.forEach((topic) => {
    if (affiliations[topic]) {
      affiliationTags.push(topic);
    } else {
      topicTags.push(topic);
    }
  });
  return (
    <Box key={project.id} my={1} className={classes.projectCardBorder}>
      <ProjectCard
        homepage={project.homepage}
        issueCount={project.open_issues}
        lastUpdate={calculateDaysSince(project.updated_at)}
        organizationAvatarUrl={project.owner.avatar_url}
        organizationUrl={project.owner.html_url}
        ownerName={project.owner.login}
        projectDescription={project.description}
        projectLanguage={project.language}
        projectName={project.name}
        projectTags={affiliationTags}
        projectUrl={project.html_url}
        stargazers={project.stargazers_count}
        topics={topicTags}
        watchers={project.watchers_count}
      />
    </Box>
  );
};

const SearchProjects = () => {
  const classes = useStyles();
  const location = useLocation();
  const [affiliations, setAffiliations] = useState({});
  const [backupFilterList, setBackupFilterList] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterSelector, setFilterSelector] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [pages, setPages] = useState(1);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState('');
  const [resultCountHeader, setResultCountHeader] = useState('');
  const [searchFilterList, setSearchFilterList] = useState(
    defaultSearchFilterList
  );
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [sort, setSort] = useState('best match');

  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'), {
    noSsr: true,
  });
  const itemsPerPage = largeScreen ? 10 : 5;

  /*
   * only want to fetch data with query params
   * the first time the page is loaded by nav from other pages
   * (e.g. Trending Topics on home page)
   */
  useEffect(() => {
    fetchTopicTags();
    if (location.query) {
      setQuery(location.query.search);
      fetchProjects(location.query.search, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (query) {
      fetchProjects(query, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [affiliations, searchFilterList, selectedFilters, pageNum, sort]);

  // need to reset page to 1 when paginator count changes to avoid strange paginator states
  useEffect(() => {
    if (query) {
      fetchProjects(query, true);
    }
    setFilterOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsPerPage]);

  const getDateQuery = (dateVal) => {
    const getDateWithOffset = (unit, offset) => {
      const d = new Date();
      switch (unit) {
      case 'h':
        d.setHours(d.getHours() - offset);
        break;
      case 'd':
        d.setDate(d.getDate() - offset);
        break;
      case 'm':
        d.setMonth(d.getMonth() - offset);
        break;
      case 'y':
        d.setFullYear(d.getFullYear() - offset);
        break;
      default:
        return d.toISOString().split('T')[0];
      }
      return d.toISOString().split('T')[0];
    };

    let queryStr = '';
    const unit = dateVal.substring(dateVal.length - 1, dateVal.length);
    if (dateVal.indexOf('<') > -1) {
      const offset = Number(dateVal.substring(1, dateVal.length - 1));
      queryStr = `<${getDateWithOffset(unit, offset)}`;
    } else if (dateVal.indexOf('>=') > -1) {
      const offset = Number(dateVal.substring(2, dateVal.length - 1));
      queryStr = `>=${getDateWithOffset(unit, offset)}`;
    } else {
      const offsets = dateVal.substring(0, dateVal.length - 1).split('-');
      queryStr = `${getDateWithOffset(
        unit,
        Number(offsets[1])
      )}..${getDateWithOffset(unit, Number(offsets[0]))}`;
    }
    return queryStr;
  };

  const fetchProjects = (queryStr, resetPageNum = false) => {
    const q = [queryStr, 'topic:civictechindex'];
    for (const filter of selectedFilters) {
      if (filter.category === 'pushed') {
        q.push(`pushed:${getDateQuery(filter.name)}`);
      } else {
        q.push(`${filter.category}:${filter.name}`);
      }
    }
    const params = {
      q: q.join(' '),
      sort: sort,
      order: 'desc',
      page: resetPageNum ? 1 : pageNum,
      per_page: itemsPerPage,
    };
    if (resetPageNum) {
      setPageNum(1);
    }
    axios
      .get(`https://api.github.com/search/repositories`, {
        headers: { Accept: 'application/vnd.github.mercy-preview+json' },
        params: params,
      })
      .then((res) => {
        setErrorState(false);
        setPages(Math.ceil(res.data.total_count / itemsPerPage));
        const items = res.data.items.map((project) =>
          renderCard(project, affiliations, classes)
        );

        setResultCountHeader(
          <ResultHeader
            itemLength={res.data.items.length}
            onHeaderClick={handleFilterOpen}
            onSortChange={handleSortChange}
            queryStr={queryStr}
            sort={sort}
            setSort={setSort}
            totalCount={res.data.total_count}
            variant={largeScreen ? 'large' : 'small'}
          />
        );
        setFilterSelector(
          <FilterSelector
            filterList={searchFilterList}
            itemLength={res.data.items.length}
            onFilterChange={handleFilterChange}
            onFilterClose={handleFilterClose}
            queryStr={queryStr}
            totalCount={res.data.total_count}
            variant={largeScreen ? 'large' : 'small'}
          />
        );
        setResults(items);
        setShowResults(true);
      })
      .catch(() => {
        setErrorState(true);
        setResultCountHeader(null);
        setFilterSelector(
          <FilterSelector
            filterList={searchFilterList}
            itemLength={0}
            onFilterChange={handleFilterChange}
            onFilterClose={handleFilterClose}
            queryStr={queryStr}
            totalCount={0}
            variant={largeScreen ? 'large' : 'small'}
          />
        );
        setResults([]);
      });
  };

  const fetchTopicTags = () => {
    const afflns = {};
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/organizations/`)
      .then((res) => {
        const tempFilterList = searchFilterList
          .filter((searchFilter) => searchFilter.category !== 'topic')
          .concat(
            res.data
              .filter((org) => org.org_tag)
              .map((org) => {
                afflns[org.org_tag] = true;
                return {
                  category: 'topic',
                  name: org.org_tag,
                  label: org.name,
                  selected: false,
                };
              })
          );
        setAffiliations(afflns);
        setSearchFilterList(tempFilterList);
      });
  };

  const handleFilterChange = (flt, deleteFlt) => {
    const tempList = searchFilterList.map((filter) => {
      if (flt.category === 'all') {
        return { ...filter, selected: false };
      } else if (filter.category === flt.category && filter.name === flt.name) {
        return { ...filter, selected: deleteFlt ? false : flt.selected };
      }
      return filter;
    });
    setSearchFilterList(tempList);
    setSelectedFilters(tempList.filter((filter) => filter.selected));
  };

  const handleFilterClose = (restore) => {
    if (restore) {
      setSearchFilterList(backupFilterList);
      setSelectedFilters(backupFilterList.filter((filter) => filter.selected));
    }
    setFilterOpen(false);
  };

  const handleFilterOpen = () => {
    setBackupFilterList(searchFilterList);
    setFilterOpen(true);
  };

  const handlePageChange = (value) => {
    setPageNum(value);
  };

  const handleSortChange = (value) => {
    setSort(value);
  };

  const handleSubmit = (event) => {
    if (event.key === 'Enter') {
      if (query) {
        fetchProjects(query, true);
      } else {
        setShowResults(false);
      }
    }
  };

  const handleSubmitClick = () => {
    if (query) {
      fetchProjects(query, true);
    }
  };

  const filterTags = selectedFilters.map((filter) => {
    return (
      <FilterTag
        key={`${filter.category}:${filter.name}`}
        label={filter.label}
        data={filter}
        onDelete={handleFilterChange}
      />
    );
  });

  const renderPage = () => {
    if (largeScreen) {
      return (
        <Grid container className={classes.content}>
          <Grid item xs={4}>
            {filterSelector}
          </Grid>
          <Grid container item xs={8} className={classes.resultSection}>
            <Grid item xs={12}>
              {resultCountHeader}
              <br />
              <ResultFilters
                filterTags={filterTags}
                show={selectedFilters.length > 0}
                onFilterChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12}>
              <ResultContainer
                results={results}
                pages={pages}
                pageNum={pageNum}
                errorState={errorState}
                onPageChange={handlePageChange}
              />
            </Grid>
          </Grid>
        </Grid>
      );
    }
    return filterOpen ? (
      <Grid container>
        <Grid item xs={12}>
          {filterSelector}
        </Grid>
      </Grid>
    ) : (
      <Grid container className={classes.content}>
        <Grid container item xs={12} className={classes.resultSection}>
          <Grid item xs={12}>
            {resultCountHeader}
            <br />
            <ResultFilters
              filterTags={filterTags}
              show={selectedFilters.length > 0}
              onFilterChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12}>
            <ResultContainer
              results={results}
              pages={pages}
              pageNum={pageNum}
              onPageChange={handlePageChange}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Box>
        {!filterOpen && (
          <HeaderSection
            onLinkClick={() => setModalOpen(true)}
            onSearchClick={handleSubmitClick}
            onSearchInput={setQuery}
            onSearchKeyPress={handleSubmit}
            searchQuery={query}
            showDefault={!showResults}
          />
        )}
        <Container>{showResults && renderPage()}</Container>
      </Box>
      <HelpModal modalOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default SearchProjects;
