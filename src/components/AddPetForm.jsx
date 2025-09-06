import { useState } from "react";
import {
  Card, CardContent, Typography, Stack,
  TextField, FormControl, InputLabel, Select, MenuItem, Button
} from "@mui/material";
import Grid from "@mui/material/Grid2"; // ✅ Grid v2 only

export default function AddPetForm({ onAdd, saving }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [species, setSpecies] = useState("dog");
  const [status, setStatus] = useState("available");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    await onAdd({
      name: name.trim(),
      age: age ? Number(age) : undefined,
      species,
      status,
    });
    setName(""); setAge(""); setSpecies("dog"); setStatus("available");
  }

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Add a Pet</Typography>
        <Stack component="form" spacing={2} onSubmit={handleSubmit} sx={{ maxWidth: 520 }}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField label="Age" type="number" inputProps={{ min: 0 }} value={age} onChange={(e) => setAge(e.target.value)} />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Species</InputLabel>
                <Select label="Species" value={species} onChange={(e) => setSpecies(e.target.value)}>
                  <MenuItem value="dog">dog</MenuItem>
                  <MenuItem value="cat">cat</MenuItem>
                  <MenuItem value="other">other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <MenuItem value="available">available</MenuItem>
                  <MenuItem value="adopted">adopted</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : "Add Pet"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
