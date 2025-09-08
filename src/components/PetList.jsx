// src/components/PetList.jsx

import { Stack, Card, CardContent, Typography, Grow, Box } from "@mui/material";
import PetItem from "./PetItem";

export default function PetList({ pets, loading, onAdopt, onDelete, onRename }) {
  if (loading) {
    return <Card><CardContent>Loading…</CardContent></Card>;
  }
  if (!pets || pets.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography color="text.secondary">No pets yet.</Typography>
        </CardContent>
      </Card>
    );
  }
  return (
    <Stack spacing={2}>
      {pets.map((p, idx) => (
        <Grow in key={p.id} timeout={250 + idx * 40}>
        <Box>
          <PetItem pet={p} onAdopt={onAdopt} onDelete={onDelete} onRename={onRename} />
        </Box>
        </Grow>
       ))} 
    </Stack>
  );
}
