import { Stack, Typography } from "@mui/material";

export default function Header() {
  return (
    <Stack spacing={0.5} mb={2}>
      <Typography variant="h3" fontWeight={800}>
        🐾 Tula’s Pet Adoption
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Day 2: CRUD — list, add, update, delete
      </Typography>
    </Stack>
  );
}
