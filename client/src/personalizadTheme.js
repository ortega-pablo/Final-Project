import styled from "@emotion/styled";
import { createTheme, Paper, Container, Button, IconButton, Typography, ListItemText, ListItemButton } from "@mui/material";
import { Box } from "@mui/system";

const theme = createTheme({
  palette: {
    mode: "light",

    common: {
      black: "#000",
      white: "#fff",
    },

    verdeLima: {
      main: "#BAFF39",
    },

    darkGrey:{
      main: "#303030",
    },
    lightGrey:{
      main: "#6E6E6E",
    },
    ultraLightGrey:{
      main: "#D5D5D5",
    },
    
    letters: {
      main: "#fff",
      light: "#fff",
      dark: "#fff",
      contrastText: "#fff",
    },

    ambar1: {
      main: "#BAFF39",
    },

    ambar2: {
      main: "#fff",
    },

    ambar3: {
      main: "#000",
    },

    ambar4: {
      main: "#8F7241",
    },

    ambar5: {
      main: "#685C44",
    },

    ambar6: {
      main: "#473F2E",
    },

    primary: {
      main: "#fff",
      light: "#fff",
      dark: "#fff",
      contrastText: "#fff",
    },

    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2",
      contrastText: "#fff",
    },

    error: {
      main: "#AE0000",
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
      primary: "#fff",
      secondary: "#fff",
      disabled: "#DFDCD3",
    },

    divider: "rgba(0, 0, 0, 0.12)",

    background: {
      paper: "#6E6E6E",
      default: "#303030",
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
  background-color: #303030;
  margin-top: 10px;
  root: {
    padding: 300px;
  }
`;

const BoxGeneral = styled(Box)`
  background-color: #303030;
`;

const CustomPaper = styled(Paper)`
  display: flex;
  margin: 0;
  padding: 0;
`;

const HiddensmUp = styled(Box)`
  @media (min-width: 600px) {
    display: none;
  }
`;
const HiddenxsDown = styled(Box)`
  @media (max-width: 600px) {
    display: none;
  }
`;

const NavButton = styled(Button)`
  color: #fff;
  border-color: #fff;
  &:hover{
    color: #BAFF39;
    border-color: #BAFF39;
  }
`;
const TypographyMenu = styled(Typography)`
  color: #fff;
  border-color: #fff;
  &:hover{
    color: #BAFF39;
    border-color: #BAFF39;
  }
`;
const ListItemButtonMenu = styled(ListItemButton)`
color: #fff;
&:hover{
  color: #BAFF39;
}
`;

const ButtonMenu = styled(Button)`
color: #fff;
border-color: #BAFF39;
&:hover{
  color: #BAFF39;
  border-color: #BAFF39;
}
`;
const ButtonContained = styled(Button)`
color: #303030;
text-color: #fff;
&:hover{
  color: #6E6E6E;
  border-color: #BAFF39;
}
`;

const ExmineIcons = styled(IconButton)`
color: #fff;
border-color: #fff;
&:hover{
  color: #BAFF39;
  border-color: #BAFF39;
}
`;

export {
  theme,
  CustomizedContainer,
  BoxGeneral,
  CustomPaper,
  HiddensmUp,
  HiddenxsDown,
  NavButton,
  ButtonMenu,
  TypographyMenu,
  ListItemButtonMenu,
  ExmineIcons,
  ButtonContained,
};
