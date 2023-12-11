import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00730b' // Green
    },
    secondary: {
      main: '#9E9E9E' // Grey
    }
  },
  typography: {
    h5: {
      textAlign: 'center'
    },
    h6: {
      textAlign: 'center'
    },
    subtitle1: {
      fontWeight: 'bold'
    },
    subtitle2: {
      fontWeight: 'bold'
    }
    // Other typography styles
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          // Assuming the container might use these styles
          marginTop: '10px'
        }
      }
    },
    MuiBox: {
      styleOverrides: {
        root: {
          // Styles for a flex box
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          // Other global box styles
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          // Styles for a sticky AppBar
          position: 'sticky',
          top: 40,
          zIndex: 1100,
          padding: '20px',
          backgroundColor: 'white',
          // Other global AppBar styles
        },
      },
    },
    // Other component customizations
  }
});

export default theme;
