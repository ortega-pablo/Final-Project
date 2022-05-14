import {createTheme} from "@material-ui/core/styles"

const theme = createTheme({
    palette: {
      primary: {
        main: '#616161',
        light: '#8d8d8d',
        dark: '#363636',
        contrastText: '#b0bec5',
      },
      secondary: {
        main: '#2979ff',
        light: '#75a7ff',
        dark: '#004ecb',
        contrastText: '#90caf9',
      },
    },
  });

export default theme;