import { createTheme } from '@mui/material'

const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#4585FD',
      contrastText: '#FFF',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          height: 48,
        },
        notchedOutline: {
          borderRadius: 20,
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          '& > .MuiGrid-item': {
            paddingLeft: 0,
          },
          '& > .recruitment-type': {
            paddingLeft: 20,
            flexBasis: '30%',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          fontFamily: 'PolinBoldFont',
        },
        sizeSmall: {
          height: '36px',

          fontSize: '0.8rem',
        },
        sizeMedium: {
          height: '48px',
          fontSize: '1rem',
        },
        sizeLarge: {
          height: '52px',
          fontSize: '1.2rem',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
        },
      },
    },
  },
  typography: {
    fontFamily: 'PolinRegularFont',
  },
})

export default theme
