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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Typography variant="subtitle1">{item.title}</Typography>
      <Box sx={{ marginTop: '10px' }}>
        {item.categories.map((category) => (
          <Chip
            key={category}
            size="small"
            variant="outlined"
            label={category}
            color="default"
            sx={{ marginRight: '5px', marginBottom: '5px' }}
          />
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

  const handleFilterChange = (category) => {
    setActiveFilters((prevFilters) => {
      const newFilters = new Set(prevFilters);
      if (newFilters.has(category)) {
        newFilters.delete(category);
      } else {
        newFilters.add(category);
      }
      return newFilters;
    });
  };

  const filteredItems = useMemo(
    () =>
      portfolioItems.filter((item) => {
        const searchLower = searchTerm.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(searchLower);
        const matchesCategories = item.categories.some((category) =>
          category.toLowerCase().includes(searchLower)
        );
        const matchesFilters =
          activeFilters.size === 0 ||
          item.categories.some((category) => activeFilters.has(category));

        return matchesFilters && (matchesTitle || matchesCategories);
      }),
    [searchTerm, activeFilters]
  );

  const theme = useTheme();

  return (
    <>
      <CssBaseline />
      <Typography
        variant="h5"
        sx={{
          position: 'fixed',
          top: 0,
          zIndex: 1100,
          padding: '10px',
          width: '100%',
          backgroundColor: 'white'
        }}
      >
        Bo Marcus Ohlsson
      </Typography>
      <Typography
        variant="h6"
        sx={{
          position: 'relative',
          top: '50px', // adjust this value to change the vertical position of "Sound Design"
          zIndex: 1000,
          padding: '10px',
          width: '100%',
          backgroundColor: 'white'
        }}
      >
        Sound Design
      </Typography>
      <Container maxWidth="md" sx={{ marginTop: '70px' }}>
        <Box
          sx={{
            position: 'sticky',
            top: 40,
            zIndex: 1100,
            padding: '20px',
            backgroundColor: 'white'
          }}
        >
          <TextField
            label="Search Projects"
            variant="outlined"
            fullWidth
            size="small"
            margin="dense"
            onChange={handleSearchChange}
            sx={{ marginBottom: '10px' }}
          />
          <Box display="flex" justifyContent="center" mb={2}>
            {['tag1', 'tag2', 'tag3'].map((category) => (
              <Button
                key={category}
                variant="text"
                onClick={() => handleFilterChange(category)}
                size="small"
                sx={{
                  color: activeFilters.has(category)
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main
                }}
              >
                {category}
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
      <Paper
        component="footer"
        sx={{ padding: '20px', marginTop: 'auto', textAlign: 'center' }}
      >
        <Typography variant="subtitle1">
          © {new Date().getFullYear()} My Portfolio
        </Typography>
      </Paper>
    </>
  );
};

export default App;
