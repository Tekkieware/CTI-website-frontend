import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { makeStyles } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    backgroundColor: theme.palette.secondary.main,
    borderBottomRightRadius: '4px',
    borderTopRightRadius: '4px',
    color: theme.palette.text.secondary,
    height: '56px',
    marginRight: '-14px',
    width: '56px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  input: {
    backgroundColor: theme.palette.background.default,
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
}));

export default function SearchBar(props) {
  const classes = useStyles();

  return (
    <TextField
      className={classes.input}
      data-cy={props.dataCy}
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <SearchRoundedIcon className={classes.icon} onClick={props.onIconClick} />
          </InputAdornment>
        ),
      }}
      margin='normal'
      onInput={props.onInput}
      onKeyPress={props.onKeyPress}
      placeholder={props.placeholder}
      value={props.value}
      variant='outlined'
    />
  );
}
