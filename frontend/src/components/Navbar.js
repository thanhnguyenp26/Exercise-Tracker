import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

// mui components
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';

// mui icons
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const { dispatch } = useWorkoutContext();
  const classes = useStyles();

  const { user } = useAuthContext();

  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    dispatch({ type: 'SEARCH_WORKOUT', payload: query.toLowerCase() });
  }, [query, dispatch]);

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
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Log In</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
