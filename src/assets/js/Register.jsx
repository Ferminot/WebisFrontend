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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:8080/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario: username.trim(),
            correo: email.trim(),
            contrasena: password
          }),
        });

        if (!response.ok) {
          const errorMsg = await response.text(); 
          setError({ server: errorMsg });
          return;
        }

        const data = await response.json();
        onRegisterSuccess(data);

      } catch (error) {
       
        const message = error instanceof Error ? error.message : "Error al conectar con el servidor.";
        setError({ server: message });
      }
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

        {error.server && <p style={{ color: "red" }}>{error.server}</p>}

        <button type="submit" style={{ padding: "10px 20px", width: "100%" }}>
          Registrar
        </button>
      </form>
    </ModalBase>
  );
}
