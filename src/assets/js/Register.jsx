import React, { useState } from "react";
import ModalBase from "./ModalBase";

export default function Register({ onRegisterSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!username.trim()) newErrors.username = "El usuario es obligatorio.";
    if (!email.trim()) newErrors.email = "El correo electrónico es obligatorio.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "El correo electrónico no es válido.";

    if (!password) newErrors.password = "La contraseña es obligatoria.";
    if (!confirmPassword) newErrors.confirmPassword = "Debes confirmar la contraseña.";
    if (password && confirmPassword && password !== confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Guardar en localStorage
      const usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
      // Evitar duplicados
      if (usuariosRegistrados.some(u => u.username === username.trim())) {
        setError({ username: "Este usuario ya existe." });
        return;
      }
      usuariosRegistrados.push({ username: username.trim(), email, password });
      localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));

      onRegisterSuccess({ username: username.trim(), email, password });
    }
  };

  return (
    <ModalBase onClose={() => onRegisterSuccess(null)}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "10px", width: "100%", marginBottom: "5px" }}
        />
        {error.username && <p style={{ color: "red" }}>{error.username}</p>}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", width: "100%", marginBottom: "5px" }}
        />
        {error.email && <p style={{ color: "red" }}>{error.email}</p>}

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", width: "100%", marginBottom: "5px" }}
        />
        {error.password && <p style={{ color: "red" }}>{error.password}</p>}

        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ padding: "10px", width: "100%", marginBottom: "15px" }}
        />
        {error.confirmPassword && <p style={{ color: "red" }}>{error.confirmPassword}</p>}

        <button type="submit" style={{ padding: "10px 20px", width: "100%" }}>
          Registrar
        </button>
      </form>
    </ModalBase>
  );
}
