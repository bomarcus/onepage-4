import { createTheme } from '@mui/material/styles';
import 'typeface-caveat'; // Import the Caveat font
import 'typeface-pacifico'; // Import the Pacifico font

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
      fontFamily: 'Caveat, cursive',
      textAlign: 'center',
      position: 'fixed',
      top: 0,
      zIndex: 1100,
      padding: '10px',
      width: '100%'
    },
    h6: {
      fontFamily: 'Pacifico, cursive',
      textAlign: 'center',
      // Add the styles from App.jsx here
      position: 'relative',
      top: '50px', // Adjust this value to change the vertical position
      zIndex: 1000,
      padding: '10px',
      width: '100%'
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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'lightgrey'
        }
      }
    },
    MuiBox: {
      styleOverrides: {
        root: {
          position: 'sticky',
          top: 40,
          zIndex: 1100,
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#00730b'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          position: 'sticky',
          top: 40,
          zIndex: 1100,
          padding: '20px',
          backgroundColor: '#00730b'
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        margin: 'dense',
        variant: 'outlined'
      },
      styleOverrides: {
        root: {
          marginBottom: '10px'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        size: 'small',
        variant: 'text'
      },
      styleOverrides: {
        root: {
          color: '#f5425a'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          marginRight: '5px',
          marginBottom: '5px',
          size: 'small',
          variant: 'outlined',
          color: 'primary'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '20px',
          marginTop: 'auto',
          textAlign: 'center',
          backgroundColor: 'lightgrey'
        }
      }
    }
  }
});

export default theme;
