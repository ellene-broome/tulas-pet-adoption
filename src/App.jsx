// src/App.jsx

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { listPets, addPet, markAdopted, deletePet, renamePet } from "./petsApi";

import { Box, Container, Fade } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorAlert from "./components/ErrorAlert";
import AddPetForm from "./components/AddPetForm";
import PetList from "./components/PetList";

export default function App() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    try {
      setLoading(true);
      setError("");
      const items = await listPets();
      const sorted = items.slice().sort((a, b) => {
        const ad = a.createdAt ? Date.parse(a.createdAt) : 0;
        const bd = b.createdAt ? Date.parse(b.createdAt) : 0;
        return bd - ad;
      });
      setPets(sorted);
    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to load pets");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddPet(data) {
    try {
      setSaving(true);
      setError("");
      const pet = { ...data, id: uuidv4(), createdAt: new Date().toISOString() };
      await addPet(pet);
      await refresh();
    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to add pet");
    } finally {
      setSaving(false);
    }
  }

  async function handleAdopt(id) {
    try {
      setError("");
      await markAdopted(id);
      await refresh();
    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to update pet");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this pet?")) return;
    try {
      setError("");
      await deletePet(id);
      await refresh();
    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to delete pet");
    }
  }

  async function handleRename(id, newName) {
    try {
      setError("");
      await renamePet(id, newName);
      await refresh();
    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to rename pet");
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="md" sx={{ py: 4, flexGrow: 1 }}>
        <Header />
        <ErrorAlert message={error} />

        {/* Fade-in animations */}
        <Fade in timeout={500}>
          <div>
            <AddPetForm onAdd={handleAddPet} saving={saving} />
          </div>
        </Fade>

        <Fade in timeout={500}>
          <div>
            <PetList
              pets={pets}
              loading={loading}
              onAdopt={handleAdopt}
              onDelete={handleDelete}
              onRename={handleRename}
            />
          </div>
        </Fade>
      </Container>

      <Footer />
    </Box>
  );
}
