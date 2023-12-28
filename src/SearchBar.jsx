import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Box, Autocomplete, Typography } from '@mui/material';
import portfolioData from './PortfolioData.json'; // Adjust the path as necessary

const SearchBar = ({ onSearchChange }) => {
  const [inputValue, setInputValue] = useState('');

  // Combine titles, tags, and categories into a single searchable list
  let searchOptions = [];
  portfolioData.forEach((project) => {
    searchOptions.push(project.title);
    searchOptions = searchOptions.concat(project.tags);
    searchOptions.push(project.category);
  });

  // Remove duplicates and filter out any empty values
  searchOptions = Array.from(new Set(searchOptions)).filter(Boolean);

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'left', maxWidth: 'md' }}
    >
      <Typography variant="subtitle1" style={{ marginRight: '20px' }}>
        ...or search:
      </Typography>
      <Box bgcolor="grey" display="flex" alignItems="center" width="100%">
        <Autocomplete
          freeSolo
          fullWidth
          options={searchOptions}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Projects"
              margin="dense"
              size="small"
              fullWidth // Add this line
              onChange={onSearchChange} // Note: Adjust if needed
              InputLabelProps={{ style: { textAlign: 'center' } }}
            />
          )}
          filterOptions={(options, state) => {
            if (state.inputValue === '') {
              return [];
            }
            return options.filter((option) =>
              option.toLowerCase().includes(state.inputValue.toLowerCase())
            );
          }}
        />
      </Box>
    </div>
  );
};

SearchBar.propTypes = {
  onSearchChange: PropTypes.func.isRequired
};

export default SearchBar;