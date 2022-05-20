import styled from "@emotion/styled";
import { createTheme, Paper } from "@mui/material";
import { Box, Container } from "@mui/system";

const theme = createTheme({
  palette: {
    mode: "light",

    common: {
      black: "#000",
      white: "#fff",
    },

    primary: {
      main: "#8f7241",
      light: "#b6893e",
      dark: "#685c44",
      contrastText: "#dfdcd3",
    },

    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2",
      contrastText: "#fff",
    },

    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
      contrastText: "#fff",
    },

    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
      contrastText: "#fff",
    },

    info: {
      main: "#0288d1",
      light: "#03a9f4",
      dark: "#01579b",
      contrastText: "#fff",
    },

    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
      contrastText: "#fff",
    },

    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },

    divider: "rgba(0, 0, 0, 0.12)",

    background: {
      paper: "#dfdcd3",
      default: "#dfdcd3",
    },

    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: "0.04",
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: "0.08",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: "0.38",
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: "0.12",
      activatedOpacity: "0.12",
    },
  },

  typography: {
    htmlFontSize: 16,
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },

});

const CustomizedContainer = styled(Container)`
  background-color: #dfdcd3;
  padding: 110px;
  margin-top: 10px;

`;

const BoxGeneral =styled(Box)`
  background-color: #dfdcd3;
`;

const CustomPaper = styled(Paper)`
display: flex;
margin: 0;
padding: 0;
background-color: #dfdcd3;
`

const CustomHidden = styled(Box)`
@media (min-width: 600px) {
    display: none;
  }
`



export  {theme , CustomizedContainer, BoxGeneral, CustomPaper, CustomHidden};





/* 

primary: {
    // Purple and green play nicely together.
    main: '#375CFF',
  },
  secondary: {
    // This is green.A700 as hex.
    main: "#11cb5f",
  },
  neutral: {
    main: "#64748B",
    contrastText: "#fff",
  }, */
