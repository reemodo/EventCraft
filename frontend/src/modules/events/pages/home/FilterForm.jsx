import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  Grid,
  Box,
} from '@mui/material';
import FilterIcon from '@mui/icons-material/FilterList';
import useExtractLocations from './hooks/useExtractLocations';
import useExtractCategories from './hooks/useExtractCategories';


const FilterForm = ({ eventsList, onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const locations = useExtractLocations(eventsList);
  const categories= useExtractCategories(eventsList)

  const handleFilterToggle = () => {
    setIsOpen(!isOpen);
  };


  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    setLocation(selectedLocation === '' ? '' : selectedLocation);
    onFilter({ location: selectedLocation, category, date });
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory === '' ? '' : selectedCategory);
    onFilter({ location, category: selectedCategory, date });
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);
    onFilter({ location, category, date: selectedDate });
  };





  return (
    <Grid container alignItems="center" >
      <Grid item>
        <IconButton onClick={handleFilterToggle}>
          <FilterIcon />
        </IconButton>
      </Grid>
      {isOpen && (
        <Grid item>
          <form>
            <Box p={2}>
              <Select
                value={location}
                onChange={handleLocationChange}
              >
                <MenuItem value="">All</MenuItem>
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>{location}</MenuItem>
                ))}
              </Select>
              <Select
                value={category}
                onChange={handleCategoryChange}
              >
                <MenuItem value="">All</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
              <TextField
                id="date"
                label="Date"
                type="date"
                value={date}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </form>
        </Grid>
      )}
    </Grid>
  );
};

export default FilterForm;
