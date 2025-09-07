// src/components/Header.jsx

import { Stack, Typography } from "@mui/material";

export default function Header() {
  return (
    <Stack spacing={0.5} mb={2}>
      <Typography variant="h3" 
      fontWeight={800}
      sx={{ 
        background: 'linear-gradient(90deg, #f9c78fff, #E52E71)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
      }}>
        🐾 Tula’s Pet Adoption
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Every Pet needs a home, every Person needs a Pet to love them! 
      </Typography>
    </Stack>
  );
}
