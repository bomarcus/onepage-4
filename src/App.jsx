import React, { useState, useMemo } from 'react';
import portfolioItems from './portfolioData.json';
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Chip,
  Box,
  Paper,
  Collapse,
  CssBaseline
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PortfolioItemComponent = ({ item, handleToggle, open }) => (
  <Card>
    <Box>
      <Typography variant="subtitle1">{item.title}</Typography>
      <Box sx={{ marginTop: '10px' }}>
        {item.tags.map((tag) => (
          <Chip key={tag} label={tag} />
        ))}
      </Box>
    </Box>
    <CardMedia
      component="img"
      height="auto"
      image={item.imageUrl}
      alt={item.title}
    />
    <CardContent>
      <Typography variant="subtitle2">{item.subtitle}</Typography>
      <Typography variant="body1">{item.description}</Typography>
      <Button onClick={() => handleToggle(item.id)}>
        {open.has(item.id) ? 'Show less' : 'Show more'}
      </Button>
      <Collapse in={open.has(item.id)}>
        <Box border={1} p={1} my={2}>
          <Typography variant="body1">{item.description}</Typography>
        </Box>
      </Collapse>
    </CardContent>
  </Card>
);

const PortfolioItem = React.memo(PortfolioItemComponent);

PortfolioItem.displayName = 'PortfolioItem';

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
      <CssBaseline />
      <Typography variant="h5">Title</Typography>
      <Typography variant="h6">Subtitle</Typography>
      <Container maxWidth="md" sx={{ marginTop: '70px' }}>
        <Box>
          <TextField
            label="Search Projects"
            fullWidth
            onChange={handleSearchChange}
          />
          <Box mb={2} display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              size="large"
              onClick={() => handleCategorySelect('category1')}
            >
              Category 1
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => handleCategorySelect('category2')}
            >
              Category 2
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => handleCategorySelect('category3')}
            >
              Category 3
            </Button>
          </Box>
          <Box mb={2}>
            {['tag1', 'tag2', 'tag3'].map((tag) => (
              <Button
                key={tag}
                onClick={() => handleFilterChange(tag)}
                sx={{
                  color: activeFilters.has(tag)
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main
                }}
              >
                {tag}
              </Button>
            ))}
          </Box>
        </Box>

        <Grid container spacing={2}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={12} md={12} key={item.id}>
              <PortfolioItem
                item={item}
                handleToggle={handleToggle}
                open={open}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Paper component="footer">
        <Typography variant="subtitle1">
          © {new Date().getFullYear()} footer
        </Typography>
      </Paper>
    </>
  );
};

export default App;
