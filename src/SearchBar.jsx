import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Box } from '@mui/material';

const SearchBar = ({ onSearchChange }) => (
  <Box
    bgcolor="grey" >
    <TextField
      label="Search Projects"
      fullWidth
      margin="dense"
      size="small"
      onChange={onSearchChange}
      InputLabelProps={{ style: { textAlign: 'center' } }}
    />
  </Box>
);

SearchBar.propTypes = {
  onSearchChange: PropTypes.func.isRequired
};

export default SearchBar;
