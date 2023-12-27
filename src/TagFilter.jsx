import React from 'react';
import { Button, Box } from '@mui/material';

const TagFilter = ({ activeFilters, onFilterChange, onClearFilters }) => (
  <Box mb={2} display="flex" justifyContent="space-around" bgcolor="lightgrey">
    {['tag1', 'tag2', 'tag3', 'tag4', 'tag5'].map((tag) => (
      <Button
        variant="text"
        key={tag}
        disableElevation
        size="small"
        color="secondary"
        onClick={() => onFilterChange(tag)}
        className={activeFilters.has(tag) ? 'tagSelected' : 'tagUnselected'}
      >
        {tag}
      </Button>
    ))}
    <Button
      variant="contained"
      disableElevation
      size="small"
      color="secondary"
      onClick={onClearFilters}
    >
      Clear Tags
    </Button>
  </Box>
);

export default TagFilter;
