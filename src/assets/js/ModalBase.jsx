// Componente ModalBase.jsx
import React from "react";

export default function ModalBase({ children, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
      onClick={onClose} // cerrar al clickear fondo
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          minWidth: "300px",
          maxWidth: "90%",
          maxHeight: "90%",
          overflowY: "auto",
          boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()} // evitar cerrar al clickear dentro
      >
        {children}
      </div>
    </div>
  );
}
