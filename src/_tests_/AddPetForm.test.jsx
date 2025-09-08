// src/_tests_/AddPetForm.test.jsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddPetForm from "../components/AddPetForm";

test("calls onAdd with minimal valid data and resets inputs", async () => {
  const user = userEvent.setup();
  // Make onAdd async so the component's `await onAdd(...)` actually waits
  const onAdd = jest.fn().mockResolvedValue(undefined);

  render(<AddPetForm onAdd={onAdd} saving={false} />);

  const nameInput = screen.getByLabelText(/name/i);
  await user.type(nameInput, "Luna");
  await user.click(screen.getByRole("button", { name: /add pet/i }));

  // wait for the submit to occur
  await waitFor(() => expect(onAdd).toHaveBeenCalledTimes(1));
  expect(onAdd).toHaveBeenCalledWith({
    name: "Luna",
    age: undefined,
    species: "dog",
    status: "available",
  });

  // wait for the form to reset
  await waitFor(() => expect(nameInput).toHaveValue(""));
});

test("Add Pet button disabled while saving", () => {
  render(<AddPetForm onAdd={jest.fn()} saving={true} />);
  expect(screen.getByRole("button", { name: /saving/i })).toBeDisabled();
});

test("does not submit when name is blank", async () => {
  const user = userEvent.setup();
  const onAdd = jest.fn().mockResolvedValue(undefined);
  render(<AddPetForm onAdd={onAdd} saving={false} />);

  await user.click(screen.getByRole("button", { name: /add pet/i }));
  expect(onAdd).not.toHaveBeenCalled();
});
