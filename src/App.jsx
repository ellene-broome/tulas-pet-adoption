// src/App.jsx

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { listPets, addPet, markAdopted, deletePet, renamePet } from "./petsApi";

export default function App() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Add form state
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [species, setSpecies] = useState("dog");
  const [status, setStatus] = useState("available");
  const [saving, setSaving] = useState(false);

  // Inline edit state
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [renameSaving, setRenameSaving] = useState(false);

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

  async function onAddPet(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    try {
      setSaving(true);
      setError("");
      const pet = {
        id: uuidv4(),
        name: name.trim(),
        age: age ? Number(age) : undefined,
        species,
        status,
        createdAt: new Date().toISOString(),
      };
      await addPet(pet);
      setName("");
      setAge("");
      setSpecies("dog");
      setStatus("available");
      await refresh();
    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to add pet");
    } finally {
      setSaving(false);
    }
  }

  async function onAdopt(id) {
    try {
      setError("");
      await markAdopted(id);
      await refresh();
    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to update pet");
    }
  }

  async function onDelete(id) {
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

  // Inline edit handlers
  function startEdit(p) {
    setEditingId(p.id);
    setEditName(p.name ?? "");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName("");
  }

  async function saveEdit() {
    if (!editName.trim()) {
      setError("Name is required");
      return;
    }
    try {
      setError("");
      setRenameSaving(true);
      await renamePet(editingId, editName.trim());
      setEditingId(null);
      setEditName("");
      await refresh();
    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to rename pet");
    } finally {
      setRenameSaving(false);
    }
  }

  return (
    <main style={{ maxWidth: 760, margin: "2rem auto", padding: "1rem" }}>
      <h1>🐾 Tula’s Pet Adoption</h1>
      <p>Day 2: CRUD — list, add, adopt (update), delete + inline rename</p>

      {error && (
        <div style={{ background: "#fee2e2", padding: "0.75rem", borderRadius: 8, margin: "1rem 0" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Add Pet */}
      <section style={{ padding: "1rem", border: "1px solid #eee", borderRadius: 12, marginBottom: "1.25rem" }}>
        <h2 style={{ marginTop: 0 }}>Add a Pet</h2>
        <form onSubmit={onAddPet} style={{ display: "grid", gap: "0.75rem", maxWidth: 520 }}>
          <label>
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Luna"
              required
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </label>

          <label>
            Age
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
              min="0"
              placeholder="e.g., 2"
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </label>

          <label>
            Species
            <select value={species} onChange={(e) => setSpecies(e.target.value)} style={{ width: "100%", padding: "0.5rem" }}>
              <option value="dog">dog</option>
              <option value="cat">cat</option>
              <option value="other">other</option>
            </select>
          </label>

          <label>
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: "100%", padding: "0.5rem" }}>
              <option value="available">available</option>
              <option value="adopted">adopted</option>
            </select>
          </label>

          <div>
            <button type="submit" disabled={saving} style={{ padding: "0.6rem 1rem" }}>
              {saving ? "Saving…" : "Add Pet"}
            </button>
          </div>
        </form>
      </section>

      {/* List */}
      <section>
        <h2 style={{ marginTop: 0 }}>Pets</h2>
        {loading ? (
          <p>Loading…</p>
        ) : pets.length === 0 ? (
          <p>No pets yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.75rem" }}>
            {pets.map((p) => (
              <li key={p.id} style={{ border: "1px solid #eee", borderRadius: 12, padding: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center" }}>
                  <div>
                    {editingId === p.id ? (
                      <>
                        <input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          style={{ padding: "0.4rem", minWidth: 200 }}
                          autoFocus
                        />
                        <div style={{ marginTop: 6, display: "flex", gap: 8 }}>
                          <button onClick={saveEdit} disabled={renameSaving}>
                            {renameSaving ? "Saving…" : "Save"}
                          </button>
                          <button onClick={cancelEdit} type="button">
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <strong>{p.name}</strong> {p.species ? `• ${p.species}` : ""}
                        </div>
                        <div style={{ fontSize: 13, color: "#555" }}>
                          {typeof p.age === "number" ? `${p.age} yr` : "age n/a"} • status: <em>{p.status || "n/a"}</em>
                        </div>
                      </>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {editingId === p.id ? null : (
                      <button onClick={() => startEdit(p)}>Edit</button>
                    )}
                    <button onClick={() => onAdopt(p.id)} disabled={p.status === "adopted"}>
                      {p.status === "adopted" ? "Adopted" : "Mark Adopted"}
                    </button>
                    <button onClick={() => onDelete(p.id)} style={{ color: "#b91c1c" }}>
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}


console.log(
  "AWS region:", import.meta.env.VITE_AWS_REGION,
  "table:", import.meta.env.VITE_DDB_TABLE,
  "key:", (import.meta.env.VITE_AWS_ACCESS_KEY_ID || "").slice(0,4) + "…"
);
