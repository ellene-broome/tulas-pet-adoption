// src/theme.js
import { createTheme } from "@mui/material/styles";

// keep these in sync with your Sass if you want
const BRAND   = "#7c3aed";   // primary (purple)
const BRAND_7 = "#6d28d9";
const ACCENT  = "#10b981";   // secondary
const DANGER  = "#ef4444";
const BG      = "#f8f7ff";   // page background (very light purple)
const PAPER   = "#ffffff";   // Card backgrounds

const theme = createTheme({
  palette: {
    mode: "light",
    primary:   { main: BRAND },
    secondary: { main: ACCENT },
    error:     { main: DANGER },
    background:{ default: BG, paper: PAPER },
    // text: { primary: "#1f2937", secondary: "#6b7280" }, // optional
  },
  shape: { borderRadius: 12 }, // rounds Buttons, Cards, TextFields, etc.
  components: {
    // Make body use the palette background + normalize margins
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: BG },
      },
    },

    // Buttons
    MuiButton: {
      defaultProps: { variant: "contained" },   // all Buttons are contained by default
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
          borderRadius: 10,
          boxShadow: "none",
          ":hover": { boxShadow: "none" },
        },
      },
    },

    // TextFields (outlined)
    MuiTextField: { defaultProps: { variant: "outlined", size: "medium" } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(124,58,237,0.25)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: BRAND_7,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: BRAND,
            borderWidth: 2,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: { root: { "&.Mui-focused": { color: BRAND } } },
    },

    // Cards
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
          border: "1px solid rgba(124,58,237,0.12)",
        },
      },
    },
  },
});

export default theme;
