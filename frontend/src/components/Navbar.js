import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

// mui components
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';

// mui icons
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const { dispatch } = useWorkoutContext();
  const classes = useStyles();

  useEffect(() => {
      
      dispatch({ type: 'SEARCH_WORKOUT', payload: query.toLowerCase() });
  }, [query]);

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <Paper className={classes.searchBar}>
          <InputBase
            placeholder="Search a workout"
            sx={{ fontFamily: 'Poppins' }}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
    </header>
  );
};

export default Navbar;
