import React from 'react';
import { Grid } from '@mui/material';
import PortfolioItem from './PortfolioItem';

const PortfolioList = ({ items, handleToggle, open }) => (
  <Grid container spacing={2}>
    {items.map((item) => (
      <Grid item xs={12} sm={12} md={12} key={item.id}>
        <PortfolioItem item={item} handleToggle={handleToggle} open={open} />
      </Grid>
    ))}
  </Grid>
);

export default PortfolioList;
