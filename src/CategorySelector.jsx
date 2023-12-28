import React, { useState } from 'react';
import { Button, Box, Menu, MenuItem, Typography, Container } from '@mui/material';
import portfolioData from './PortfolioData.json'; // Adjust the path as necessary

const CategorySelector = ({ onSelectCategory, selectedCategory }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuId, setMenuId] = useState('');

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setMenuId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuId('');
  };

  const getProjectsByCategory = (category) =>
    portfolioData.filter((project) => project.category === category);

  // Extracting unique categories from portfolio data
  const uniqueCategories = Array.from(
    new Set(portfolioData.map((project) => project.category))
  );

  return (
    <Container maxWidth="md" style={{ display: 'flex', padding: '0' }}>
      <Typography variant="subtitle1" style={{ marginRight: '20px', alignSelf: 'center' }}>
        Choose by category:
      </Typography>
      <Box mb={2} display="flex" flexGrow={1} justifyContent="space-around" bgcolor="grey">
        {uniqueCategories.map((category) => (
          <div key={category}>
            <Button
              variant="contained"
              disableElevation
              size="small"
              color="primary"
              onClick={(e) => handleClick(e, category)}
              className={
                selectedCategory === category
                  ? 'categorySelected'
                  : 'categoryUnselected'
              }
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
            <Menu
              id={`menu-${category}`}
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && menuId === category}
              onClose={handleClose}
            >
              {getProjectsByCategory(category).map((project) => (
                <MenuItem
                  key={project.id}
                  onClick={() => onSelectCategory(project.title)}
                >
                  {project.title}
                </MenuItem>
              ))}
            </Menu>
          </div>
        ))}
        <Button
          variant="contained"
          disableElevation
          size="small"
          color="primary"
          onClick={() => onSelectCategory('all')}
          className={
            selectedCategory === 'all'
              ? 'categorySelected'
              : 'categoryUnselected'
          }
        >
          All
        </Button>
      </Box>
    </Container>
  );
};

export default CategorySelector;
