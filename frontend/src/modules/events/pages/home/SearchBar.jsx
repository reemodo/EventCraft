import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";

import Box from "@mui/material/Box";

import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  transition: "background-color 0.3s, box-shadow 0.5s",
  boxShadow: "8px 4px 8px rgba(0, 0, 0, 0.1),-4px -2px 10px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    backgroundColor:'rgb(255 255 255 / 82%);',
    boxShadow:
      "2px 10px 10px rgba(0, 0, 0, 0.2),-4px -2px 10px rgba(0, 0, 0, 0.2)",
  },

  margin: "0 auto",
  borderRadius: "50px",
  display: "flex",
  alignItems: "center",
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  borderRadius: "50px",
  color:'black',
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  display: "flex",
  alignItems: "center",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#111",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
    },
  },
}));
export default function SearchBar({ handelSearch, handleFilter, events }) {
  const [searchTitle, setSearchTitle] = useState("");

  const handelSearchInput = (title) => {
    setSearchTitle(title);
    handelSearch(title);
  };

  return (
    <Box sx={{ width: "70%;", marginBottom:"2%" }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => handelSearchInput(e.target.value)}
        />
      </Search>
    </Box>
  );
}
