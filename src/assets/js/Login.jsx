import React, { useState } from "react";
import ModalBase from "./ModalBase";
import AuthService from "../../assets/js/AuthService";

export default function Login({ onLogin, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");

    if (!email.trim() || !password.trim()) {
      setErrors("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: email.trim(),
          contrasena: password
        })
      });

      if (!response.ok) {
        setErrors("Correo o contraseña incorrectos.");
        return;
      }

      const data = await response.json();

      // 🔑 NUEVO: guardar si es admin
      localStorage.setItem("isAdmin", data.isAdmin ?? false);

      // 🔐 sesión (igual que antes)
      AuthService.login(data.token, { username: data.username });

      onLogin(data.username);

    } catch (error) {
      console.error(error);
      setErrors("Error al conectar con el servidor.");
    }
  };

  return (
    <ModalBase onClose={onClose}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        {errors && <p style={{ color: "red" }}>{errors}</p>}

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
