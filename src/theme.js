// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#7c3aed' }, // purple accent
  },
  components: {
    MuiButton: { defaultProps: { variant: 'contained' } },
  },
});

export default theme;
