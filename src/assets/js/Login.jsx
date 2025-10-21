import React, { useState } from "react";
import ModalBase from "./ModalBase";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    if (!username.trim() || !password) {
      setErrors("Todos los campos son obligatorios.");
      return;
    }

    // Recuperar usuarios registrados del localStorage
    const storedUsers = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

    const user = storedUsers.find(
      (u) => u.username === username.trim() && u.password === password
    );

    if (!user) {
      setErrors("Usuario o contraseña incorrectos.");
      return;
    }

    onLogin(user.username); // usuario válido
  };

  return (
    <ModalBase onClose={() => onLogin(null)}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {errors && <p style={{ color: "red" }}>{errors}</p>}

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", width: "100%", marginBottom: "15px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", width: "100%" }}>
          Entrar
        </button>
      </form>
    </ModalBase>
  );
}
