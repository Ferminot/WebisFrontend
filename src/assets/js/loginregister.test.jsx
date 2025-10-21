import { it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "./Register";

it("llama a onRegisterSuccess al registrar correctamente", async () => {
  const mockOnRegisterSuccess = vi.fn();
  render(<Register onRegisterSuccess={mockOnRegisterSuccess} />);

  fireEvent.change(screen.getByPlaceholderText("Usuario"), { target: { value: "user3" } });
  fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), { target: { value: "user3@mail.com" } });
  fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "123456" } });
  fireEvent.change(screen.getByPlaceholderText("Confirmar Contraseña"), { target: { value: "123456" } });

  fireEvent.click(screen.getByText("Registrar"));

    //confirmamos que onRegister recibe los datos
  expect(mockOnRegisterSuccess).toHaveBeenCalledWith({
    username: "user3",
    email: "user3@mail.com",
    password: "123456"
  });
});

