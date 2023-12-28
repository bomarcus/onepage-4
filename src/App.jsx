import React, { useState, useMemo } from 'react';
import portfolioItems from './portfolioData.json';
import { Container, Divider, useTheme, Box } from '@mui/material';
import Header from './Header';
import SearchBar from './SearchBar';
import CategorySelector from './CategorySelector';
import TagFilter from './TagFilter';
import PortfolioList from './PortfolioList';
import Footer from './Footer';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('');
  const [open, setOpen] = useState(new Set());

  const handleToggle = (id) => {
    setOpen((prevOpen) => {
      const newOpen = new Set(prevOpen);
      if (newOpen.has(id)) {
        newOpen.delete(id);
      } else {
        newOpen.add(id);
      }
      return newOpen;
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (tag) => {
    setActiveFilters((prevFilters) => {
      const newFilters = new Set(prevFilters);
      if (newFilters.has(tag)) {
        newFilters.delete(tag);
      } else {
        newFilters.add(tag);
      }
      return newFilters;
    });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setActiveFilters(new Set()); // Clear tag filters when a category is selected
  };

  const filteredItems = useMemo(() => {
    return portfolioItems.filter((item) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesTitle = item.title.toLowerCase().includes(searchLower);
      const matchesTags = item.tags?.some((tag) =>
        tag.toLowerCase().includes(searchLower)
      );
      const matchesCategory = item.category
        ?.toLowerCase()
        .includes(searchLower);

      const matchesFilters =
        activeFilters.size === 0 ||
        item.tags?.some((tag) => activeFilters.has(tag));

      return (
        (selectedCategory === '' || item.category === selectedCategory) &&
        matchesFilters &&
        (matchesTitle || matchesTags || matchesCategory)
      );
    });
  }, [searchTerm, activeFilters, selectedCategory]);

  const theme = useTheme();

  return (
    <>
      <Header />
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100
        }}
      >
        <Container maxWidth="md" sx={{ marginTop: '10px' }}>
          <CategorySelector onSelectCategory={handleCategorySelect} />
          <TagFilter
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={() => setActiveFilters(new Set())}
            theme={theme}
          />
          <SearchBar onSearchChange={handleSearchChange} />
          <Divider orientation="horizontal" />
        </Container>
      </Box>
      <Container maxWidth="md">
        <PortfolioList
          items={filteredItems}
          handleToggle={handleToggle}
          open={open}
        />
      </Container>
      <Footer />
    </>
  );
};

export default App;
