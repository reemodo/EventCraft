import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  Grid,
  Box,
  InputLabel,
  FormControl,
} from "@mui/material";
import FilterIcon from "@mui/icons-material/FilterList";
import useExtractLocations from "./hooks/useExtractLocations";
import useExtractCategories from "./hooks/useExtractCategories";

const FilterForm = ({ eventsList, onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const locations = useExtractLocations(eventsList);
  const categories = useExtractCategories(eventsList);

  const handleFilterToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    setLocation(selectedLocation === "" ? "" : selectedLocation);
    onFilter({ location: selectedLocation, category, date });
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory === "" ? "" : selectedCategory);
    onFilter({ location, category: selectedCategory, date });
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);
    onFilter({ location, category, date: selectedDate });
  };

  return (
    <Grid container justifyContent={"center"} direction={"row"}>
      {/* <Grid item height={"95px"}>
        <IconButton onClick={handleFilterToggle}>
          <FilterIcon />
        </IconButton>
      </Grid> */}
      {
        <Grid item>
          <form>
            <Box p={2}>
              <FormControl variant="standard" sx={{ width: 150 }}>
                {/* <InputLabel id="demo-simple-select-label">Location</InputLabel> */}
                <TextField
                  select
                  labelId="demo-simple-select-label"
                  value={location}
                  onChange={handleLocationChange}
                  label={"Location"}
                >
                  <MenuItem value="">All</MenuItem>
                  {locations.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <FormControl variant="standard" sx={{ ml: 2, mr: 2, width: 150 }}>
                {/* <InputLabel id="categoryLabel">Category</InputLabel> */}
                <TextField
                  select
                  labelId="categoryLabel"
                  value={category}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  <MenuItem value="">All</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
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
      }
    </Grid>
  );
};

export default FilterForm;
