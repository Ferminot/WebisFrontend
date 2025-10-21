import React, { useState } from "react";
import '../css/cart.css';

const Carrito = ({ open, setOpen, cart, setCart }) => {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    notas: "",
  });

  const [errores, setErrores] = useState({});

  if (!open) return null;

  const total = cart.reduce((sum, producto) => sum + producto.precio, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const errs = {};
    if (!formData.nombre) errs.nombre = "El nombre es obligatorio";
    if (!formData.correo) errs.correo = "El correo es obligatorio";
    else if (!formData.correo.includes("@")) errs.correo = "Correo inválido";
    if (!formData.telefono) errs.telefono = "El teléfono es obligatorio";
    else if (!/^\d+$/.test(formData.telefono)) errs.telefono = "Solo números permitidos";
    if (!formData.direccion) errs.direccion = "La dirección es obligatoria";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validar();
    setErrores(errs);
    if (Object.keys(errs).length === 0) {
      alert("¡Compra realizada con éxito!");
      setShowForm(false);
      setOpen(false);
      setCart([]); // Reinicia el carrito
      setFormData({
        nombre: "",
        correo: "",
        telefono: "",
        direccion: "",
        notas: "",
      });
    }
  };

  return (
    <div className="carrito-overlay" onClick={() => setOpen(false)}>
      <div className="carrito-container" onClick={(e) => e.stopPropagation()}>
        <h2>🛒 Tu Carrito</h2>
        {cart.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <>
            <ul className="carrito-lista">
              {cart.map((producto, index) => (
                <li key={index} className="carrito-item">
                  <img
                    src={producto.img}
                    alt={producto.nombre}
                    style={{ width: "40px", height: "40px", objectFit: "cover", marginRight: "10px", borderRadius: "4px" }}
                  />
                  <span>{producto.nombre}</span>
                  <span style={{ marginLeft: "auto" }}>☀️ ${producto.precio.toLocaleString()}</span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "15px", fontWeight: "bold", fontSize: "18px", display: "flex", justifyContent: "space-between", padding: "0 10px" }}>
              <span>Total:</span>
              <span>☀️ ${total.toLocaleString()}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
              <button
                style={{ backgroundColor: "#8B4513", color: "white", padding: "10px 20px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
                onClick={() => setShowForm(true)}
              >
                Proceder Compra
              </button>
            </div>
          </>
        )}

        <button onClick={() => setOpen(false)} style={{ marginTop: "10px" }}>
          Cerrar
        </button>

        {/* Modal de formulario centrado */}
        {showForm && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 3000,
              opacity: showForm ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
            onClick={() => setShowForm(false)}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "12px",
                width: "90%",
                maxWidth: "450px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                transform: showForm ? "scale(1)" : "scale(0.9)",
                transition: "transform 0.3s ease",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Formulario de Compra</h2>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "12px" }}>
                  <label>Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "6px", border: "1px solid #ccc" }}
                  />
                  {errores.nombre && <span style={{ color: "red", fontSize: "12px" }}>{errores.nombre}</span>}
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label>Correo:</label>
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "6px", border: "1px solid #ccc" }}
                  />
                  {errores.correo && <span style={{ color: "red", fontSize: "12px" }}>{errores.correo}</span>}
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label>Teléfono:</label>
                  <input
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "6px", border: "1px solid #ccc" }}
                  />
                  {errores.telefono && <span style={{ color: "red", fontSize: "12px" }}>{errores.telefono}</span>}
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label>Dirección:</label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "6px", border: "1px solid #ccc" }}
                  />
                  {errores.direccion && <span style={{ color: "red", fontSize: "12px" }}>{errores.direccion}</span>}
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label>Notas adicionales:</label>
                  <textarea
                    name="notas"
                    value={formData.notas}
                    onChange={handleChange}
                    placeholder="Ej: Dejar en recepción"
                    style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "6px", border: "1px solid #ccc", resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: "15px",
                    width: "100%",
                    backgroundColor: "#8B4513",
                    color: "white",
                    padding: "12px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Finalizar Compra
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;
