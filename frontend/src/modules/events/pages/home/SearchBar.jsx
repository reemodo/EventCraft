import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FilterForm from './FilterForm';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'transparent',
  transition: 'background-color 0.3s, box-shadow 0.5s',
  boxShadow: '8px 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.05),
    boxShadow: '12px 16px 16px rgba(0, 0, 0, 0.2)',
  },
  width: '700px', 
  margin: '0 auto', 
  borderRadius: '50px',
  display: 'flex',
  alignItems: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  flex: 1,
  padding: theme.spacing(1, 1, 1, 2),
  marginLeft: theme.spacing(0), // Adjusting the left margin
}));

export default function SearchBar({ handelSearch, handleFilter, events }) {
  const [searchTitle, setSearchTitle] = useState('');

  const handelSearchInput = (title) => {
    setSearchTitle(title);
    handelSearch(title);
  };

  return (
    <Box sx={{}}>
      <Search>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => handelSearchInput(e.target.value)}
        />
      </Search>
    </Box>
  );
}
