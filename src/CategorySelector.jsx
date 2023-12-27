import React from 'react';
import { Button, Box } from '@mui/material';

const CategorySelector = ({ onSelectCategory, selectedCategory }) => {
  return (
    <Box
      mb={2}
      display="flex"
      justifyContent="space-around"
      bgcolor="grey"
    >
      {['category1', 'category2', 'category3', ''].map((category) => (
        <Button
          key={category}
          variant="contained"
          disableElevation
          size="small"
          color="primary"
          onClick={() => onSelectCategory(category)}
          className={
            selectedCategory === category
              ? 'categorySelected'
              : 'categoryUnselected'
          }
        >
          {category || 'All'}
        </Button>
      ))}
    </Box>
  );
};

export default CategorySelector;
