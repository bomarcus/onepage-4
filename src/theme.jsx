import { createTheme } from '@mui/material/styles';

// Create a base theme object
const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 24,
    h1: {
      fontSize: '2.5rem'
    },
    h2: {
      fontSize: '2rem'
    },
    h3: {
      fontSize: '1.75rem'
    },
    h4: {
      fontSize: '1.5rem'
    },
    h5: {
      fontSize: '1.25rem'
    },
    h6: {
      fontSize: '1rem'
    },
    body1: {
      fontSize: '1rem'
    },
    body2: {
      fontSize: '0.875rem'
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 'bold'
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 'bold'
    },
    caption: {
      fontSize: '0.75rem'
    }
  },
  palette: {
    background: {
      default: '#ffc107' // Default background color
    },
    primary: {
      main: '#248f9c', // Your primary color
      light: '#52c1c9', // A lighter shade of the primary color
      dark: '#176973' // A darker shade of the primary color
    },
    secondary: {
      main: '#6c757d', // Your secondary color
      light: '#949cad', // A lighter shade of the secondary color
      dark: '#4d565f' // A darker shade of the secondary color
    },
    error: {
      main: '#d32f2f' // Error color
    },
    warning: {
      main: '#ffc107' // Warning color
    },
    info: {
      main: '#0288d1' // Info color
    },
    success: {
      main: '#4caf50' // Success color
    }
  }
});

// Export the base theme object
export default theme;
