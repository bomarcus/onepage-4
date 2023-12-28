import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import portfolioData from './PortfolioData.json'; // Adjust the path as necessary

const TagFilter = ({ activeFilters, onFilterChange, onClearFilters }) => {
  // Extracting unique tags from portfolio data
  const allTags = Array.from(
    new Set(portfolioData.flatMap((project) => project.tags))
  );

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'left', maxWidth: 'md' }}
    >
      <Typography variant="subtitle1" style={{ marginRight: '16px', alignItems: 'left' }}>
        Or filter by tags:
      </Typography>
      <Box
        mb={2}
        display="flex"
        justifyContent="space-around"
        bgcolor="lightgrey"
      >
        {allTags.map((tag) => (
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
    </div>
  );
};

export default TagFilter;
