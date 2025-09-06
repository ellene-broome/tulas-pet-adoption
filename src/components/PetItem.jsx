import { useState } from "react";
import {
  Card, CardContent, Stack, TextField, Typography, Button
} from "@mui/material";
import Grid from "@mui/material/Grid2"; // ✅ Grid v2 only

export default function PetItem({ pet, onAdopt, onDelete, onRename }) {
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(pet.name ?? "");
  const [renameSaving, setRenameSaving] = useState(false);

  async function save() {
    if (!editName.trim()) return;
    try {
      setRenameSaving(true);
      await onRename(pet.id, editName.trim());
      setEditing(false);
    } finally {
      setRenameSaving(false);
    }
  }

  return (
    <Card>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          {/* left column grows */}
          <Grid sx={{ minWidth: 0, flexGrow: 1 }}>
            {editing ? (
              <>
                <TextField
                  size="small"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  autoFocus
                />
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Button color="success" onClick={save} disabled={renameSaving}>
                    {renameSaving ? "Saving…" : "Save"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => { setEditing(false); setEditName(pet.name ?? ""); }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </>
            ) : (
              <>
                <Typography variant="subtitle1" fontWeight={600}>
                  {pet.name}{pet.species ? ` • ${pet.species}` : ""}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {typeof pet.age === "number" ? `${pet.age} yr` : "age n/a"} • status: <em>{pet.status || "n/a"}</em>
                </Typography>
              </>
            )}
          </Grid>

          {/* buttons column */}
          <Grid>
            {!editing && (
              <Stack direction="row" spacing={1}>
                <Button variant="outlined" onClick={() => setEditing(true)}>Edit</Button>
                <Button onClick={() => onAdopt(pet.id)} disabled={pet.status === "adopted"}>
                  {pet.status === "adopted" ? "Adopted" : "Mark Adopted"}
                </Button>
                <Button variant="outlined" color="error" onClick={() => onDelete(pet.id)}>
                  Delete
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
