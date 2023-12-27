import React from 'react';
import { Typography, Paper } from '@mui/material';

const Footer = () => (
  <Paper component="footer">
    <Typography variant="subtitle1">
      © {new Date().getFullYear()} footer
    </Typography>
  </Paper>
);

export default Footer;
