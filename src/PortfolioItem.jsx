import React from 'react';
import {
  Card,
  Box,
  Typography,
  CardMedia,
  CardContent,
  Button,
  Collapse,
  Chip
} from '@mui/material';

import PropTypes from 'prop-types';

const PortfolioItemComponent = ({ item, handleToggle, open }) => (
  <Card>
    <Box>
      <Typography variant="h1" align="center">{item.title}</Typography>
      <Typography variant="h2" align="center">{item.production}</Typography>
<Box
  sx={{
    marginTop: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center'
  }}
>
  {/* Displaying the category */}
  <Chip label={`Category: ${item.category}`} color="primary" variant="outlined" />

  {/* Displaying the tags */}
  {item.tags.map((tag) => (
    <Chip key={tag} label={tag} color="primary" variant="outlined" />
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
      <Typography variant="body1">{item.subtitle}</Typography>
      <Typography variant="body2">{item.description}</Typography>
      <Button onClick={() => handleToggle(item.id)}>
        {open.has(item.id) ? 'Show less' : 'Show more'}
      </Button>
      <Collapse in={open.has(item.id)}>
        <Box border={0} p={1} my={2}>
          <Typography variant="body2">{item.description}</Typography>
        </Box>
      </Collapse>
    </CardContent>
  </Card>
);

PortfolioItemComponent.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    production: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    imageUrl: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  handleToggle: PropTypes.func.isRequired,
  open: PropTypes.instanceOf(Set).isRequired,
};


const PortfolioItem = React.memo(PortfolioItemComponent);

export default PortfolioItem;
