import React from 'react';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { makeStyles } from '@mui/material/styles';
import Buttons from './buttons';
import Colors from './colors';
import TopicTags from './topic-tags';
import TypeStandards from './type-standards';
import Typography from './typography';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.primary,
    padding: theme.spacing(3),
  },
  gridItem0: {
    backgroundColor: theme.palette.background.secondary,
  },
  gridItem1: {
    backgroundColor: theme.palette.background.default,
  },
}));

const Guides = (props) => {
  const { history, match } = props;
  const classes = useStyles();
  const [guide, setGuide] = React.useState(match.params.guide || 'colors');

  const handleChange = (event) => {
    setGuide(event.target.value);
    history.push('/guides/' + event.target.value);
  };

  const components = {
    buttons: Buttons,
    colors: Colors,
    'topic-tags': TopicTags,
    'type-standards': TypeStandards,
    typography: Typography,
  };
  const Guide = components[guide];

  return (
    <Container className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2} className={classes.gridItem0}>
          <FormControl>
            <InputLabel id='select-a-guide'>Guides</InputLabel>
            <Select autoWidth labelId='select-a-guide' onChange={handleChange} value={guide} IconComponent={ExpandMoreRoundedIcon}>
              <MenuItem value=''>
                <em>Select a Guide</em>
              </MenuItem>
              <MenuItem value='buttons'>Buttons</MenuItem>
              <MenuItem value='colors'>Colors</MenuItem>
              <MenuItem value='topic-tags'>Topic Tags</MenuItem>
              <MenuItem value='type-standards'>Type Standards</MenuItem>
              <MenuItem value='typography'>Typography</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={10} className={classes.gridItem1}>
          <Guide />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Guides;
