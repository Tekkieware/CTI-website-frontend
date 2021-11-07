/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import PriorityQueue from 'js-priority-queue';
import { renderCard } from './RenderProjectCard';
import { OtherProjectsDropdown } from './OtherProjectsDropdown'
import ResultContainer from '../SearchProjects/ResultContainer';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import SortDropdown from '../../components/SortDropdown';

const calculateDaysSince = (updateTime) => {
  const days = new Date() - new Date(updateTime);
  return Math.round(days / (1000 * 3600 * 24));
};

const renderListItem = (project, classes) => {
  const urlText = project.html_url.replaceAll("https://github.com/", "");

  return (
    <ListItem key={project.id}>
      <a href={project.html_url} className={classes.dropdownOptionLinkStyle}>{urlText}</a>
    </ListItem>
  );
};

const useStyles = makeStyles((theme) => ({
  centerContainerStyle: {
    [theme.breakpoints.down('md')]: {
      marginLeft: '32px',
      marginRight: '32px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '16px',
      marginRight: '16px',
    },
  },
  allSubmittedProjectSectionStyle: {
    marginTop: '32px',
    marginBottom: '12px',
    [theme.breakpoints.down('md')]: {
      marginTop: '32px',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '26px',
    },
  },
  contentContainerStyle: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: '806px',
      margin: 'auto',
    },
    [theme.breakpoints.down('lg')]: {
      maxWidth: '806px',
      margin: 'auto',
    },
    [theme.breakpoints.down('md')]: {
      minWidth: '896px',
      maxWidth: '1279px',
      margin: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '568px',
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '0px',
    },
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


export const IndvPageContainer = (props) => {
  const classes = useStyles();
  const inputSortMethodList = ['best match', 'updated', 'stars'];
  const projectsPerPage = 4;
  const [affiliations, setAffiliations] = useState({});
  const [bestMatchProjects, setBestMatchProjects] = useState([]);
  const [dropDownListItem, setDropDownListItem] = useState('');
  const [errorState, setErrorState] = useState(false);
  const [isProjectSearchFinish, setIsProjectSearchFinish] = useState(false);
  const [itemLength, setItemLength] = useState(0);
  const [lastUpdatedProjects, setLastUpdatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const [projects, setProjects] = useState([]);
  const [results, setResults] = useState('');
  const [sortMethod, setSortMethod] = useState('best match');
  const [stargazerProjects, setStargazerProjects] = useState([]);

  useEffect(() => {
    setLoading(true);
    setErrorState(false);
    setIsProjectSearchFinish(false);
    setProjects([]);
    setBestMatchProjects([]);
    setLastUpdatedProjects([]);
    setStargazerProjects([]);
    setResults('');
    setDropDownListItem('');
    setSortMethod('best match');
    fetchAffiliations();
  }, [props.pathName]);

  // Fetching the data for 'other repo' dropdown elements
  useEffect(() => {
    if (props.orgGithubName !== null && props.orgGithubName !== '') {
      axios
        .get(`https://api.github.com/search/repositories`, {
          headers: { Accept: 'application/vnd.github.mercy-preview+json' },
          params: {
            q: 'topic:' + props.orgGithubName,
            sort: 'updated',
            order: 'desc',
            per_page: 100,
          },
        })
        .then((res) => {
          const resList = [];
          res.data.items
            .filter(
              (project) =>
                !project.full_name.includes(props.orgGithubName) &&
                project.full_name !== undefined
            )
            .map((otherProjectItem) => {
              resList.push(renderListItem(otherProjectItem, classes));
              return null;
            });

          setDropDownListItem(resList);
        })
        .catch((err) => {
          setErrorState(true);
        });
    }
  }, [classes, props.orgGithubName]);

  // Loading the Submitted projects searched by element from its projectSearchTopicsArr
  useEffect(() => {
    const repoMap = new Map();
    if (props.projectSearchTopicsArr.length > 0) {
      // remove duplicate search topics
      let filteredArray = props.projectSearchTopicsArr;
      filteredArray = filteredArray.filter((elem) => elem);
      const topicSet = new Set(filteredArray);
      topicSet.forEach(
        async (topic) =>
          await axios
            .get(`https://api.github.com/search/repositories`, {
              headers: { Accept: 'application/vnd.github.mercy-preview+json' },
              params: {
                q: 'topic:civictechindex ' + topic,
                sort: 'best match',
                order: 'desc',
                per_page: 100,
              },
            })
            .then((res) => {
              repoMap.set(topic, res.data.items);
              if (repoMap.size === topicSet.size) {
                const repoKeyArr = [];
                const bestMatchSortedProjectsArr = [];
                topicSet.forEach((element) => {
                  const repoArr = repoMap.get(element);
                  repoArr.forEach((org) => {
                    if (!repoKeyArr.includes(org.name)) {
                      repoKeyArr.push(org.name);
                      org.parentOrgs = props.parentOrgs;
                      bestMatchSortedProjectsArr.push(org);
                    }
                  });
                });

                const lastUpdatedSortedProjectsArr = getSortedProjectsArr(
                  'lastUpdated',
                  bestMatchSortedProjectsArr
                );
                const stargazerSortedProjectsArr = getSortedProjectsArr(
                  'stargazer',
                  bestMatchSortedProjectsArr
                );
                setProjects(bestMatchSortedProjectsArr);
                setBestMatchProjects(bestMatchSortedProjectsArr);
                setStargazerProjects(stargazerSortedProjectsArr);
                setLastUpdatedProjects(lastUpdatedSortedProjectsArr);
                setPages(
                  Math.ceil(bestMatchSortedProjectsArr.length / projectsPerPage)
                );
                setIsProjectSearchFinish(true);
              }
            })
            .catch((err) => {
              setErrorState(true);
            })
      );
    }
  }, [props.parentOrgs, props.projectSearchTopicsArr]);

  // Update the submitted projects list if the path, sort method or page number is changed.
  useEffect(() => {
    handlePageChange(1);
    if (isProjectSearchFinish) {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProjectSearchFinish]);

  useEffect(() => {
    if (sortMethod === 'best match') {
      setProjects(bestMatchProjects);
    } else if (sortMethod === 'updated') {
      setProjects(lastUpdatedProjects);
    } else {
      setProjects(stargazerProjects);
    }
  }, [bestMatchProjects, lastUpdatedProjects, sortMethod, stargazerProjects]);

  // Using priorityQueue to sort result list.
  const getSortedProjectsArr = (sortMethod, bestMatchSortedProjectsArr) => {
    let priorityQueue;
    const sortedProjectsArr = [];
    if (sortMethod === 'lastUpdated') {
      priorityQueue = new PriorityQueue({
        comparator: function (a, b) {
          return (
            calculateDaysSince(a.updated_at) - calculateDaysSince(b.updated_at)
          );
        },
      });
    } else if (sortMethod === 'stargazer') {
      priorityQueue = new PriorityQueue({
        comparator: function (a, b) {
          return b.stargazers_count - a.stargazers_count;
        },
      });
    }

    bestMatchSortedProjectsArr.map((i) => priorityQueue.queue(i));
    const lengthOfPriorityQueue = priorityQueue.length;
    for (let index = 0; index < lengthOfPriorityQueue; ++index) {
      const project = priorityQueue.dequeue();
      sortedProjectsArr.push(project);
    }
    return sortedProjectsArr;
  };

  const fetchAffiliations = () => {
    const afflns = {};
    axios.get(`${process.env.REACT_APP_API_URL}/api/organizations/`)
      .then((res) => {
        res.data.forEach((org) => {
          afflns[org.org_tag] = true;
        });
        setAffiliations(afflns);
      });
  };

  const handlePageChange = (pageNum) => {
    setPageNum(pageNum);
    const indexOfLastProject = pageNum * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    let itemLen = projectsPerPage;
    if (indexOfLastProject > projects.length) {
      itemLen = projects.length - indexOfFirstProject;
    }
    const currentProjects = projects.slice(
      indexOfFirstProject,
      indexOfLastProject
    );
    const items = currentProjects.map((i) => renderCard(i, affiliations));
    setItemLength(itemLen);
    setResults(items);
  };

  return (
    <>
      <Grid className={classes.contentContainerStyle}>
        <Grid item className={classes.centerContainerStyle}>
          {dropDownListItem.length > 0 ? (
            <OtherProjectsDropdown
              dropdownTitle={props.dropdownTitle}
              dropDownListItem={dropDownListItem}
            />
          ) : (
            ''
          )}
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            className={classes.allSubmittedProjectSectionStyle}
          >
            <Box>
              <Typography variant='h5'>All Submitted Projects</Typography>
              {projects.length > 0 && (
                <Typography variant='body2' color='primary'>
                  Displaying {itemLength} of {projects.length} results
                </Typography>
              )}
            </Box>
            <SortDropdown
              inputSortMethodList={inputSortMethodList}
              defaultSortMethod={sortMethod}
              setSortMethod={setSortMethod}
            />
          </Box>
          {!loading ? (
            <ResultContainer
              results={results}
              pages={pages}
              pageNum={pageNum}
              onPageChange={handlePageChange}
            />
          ) : errorState ? (
            <Box my={12} display='flex' justifyContent='center'>
              <Typography variant='h5' className={classes.message}>
                <i>
                  We are experiencing technical issues. Please try again later.
                </i>
              </Typography>
            </Box>
          ) : (
            <Box my={12} display='flex' justifyContent='center'>
              <CircularProgress color='secondary' />
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};
