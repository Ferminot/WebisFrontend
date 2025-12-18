import React, { useState } from "react";
import '../css/cart.css';
import AuthService from "../../assets/js/AuthService";

const Carrito = ({ open, setOpen, cart, setCart }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    notas: "",
  });

  if (!open) return null;

  const total = cart.reduce((sum, producto) => sum + (producto.valor ?? 0), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const eliminarDelCarrito = (index) => {
    const nuevoCart = [...cart];
    nuevoCart.splice(index, 1);
    setCart(nuevoCart);
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

  const enviarPedido = async (pedido) => {
  try {
    const token = AuthService.getToken();
    if (!token) {
      alert("Debes iniciar sesión para hacer un pedido");
      return;
    }

    const response = await fetch("http://localhost:8080/api/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(pedido)
    });

    if (!response.ok) {
      console.error("Error backend:", await response.text());
      throw new Error("Error al enviar el pedido");
    }

    const data = await response.json();
    console.log("🟢 Pedido enviado OK:", data);
    return data;

  } catch (error) {
    console.error("❌ Error en enviarPedido:", error);
    alert("Ocurrió un error al procesar el pedido.");
  }
};



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!AuthService.isLoggedIn()) {
      alert("Debes iniciar sesión para hacer un pedido");
      return;
    }

    const errs = validar();
    if (Object.keys(errs).length === 0) {
      const totalCompra = cart.reduce((sum, producto) => sum + producto.valor, 0);

      const pedido = {
        nombre: formData.nombre,
        correo: formData.correo,
        telefono: formData.telefono,
        direccion: formData.direccion,
        notasAdicionales: formData.notas,
        total: totalCompra,
      };

      const resultado = await enviarPedido(pedido);

      if (resultado) {
        alert("¡Compra realizada con éxito!");
        setShowForm(false);
        setOpen(false);
        setCart([]);
        setFormData({
          nombre: "",
          correo: "",
          telefono: "",
          direccion: "",
          notas: "",
        });
      }
    } else {
      alert(Object.values(errs).join("\n"));
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
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      marginRight: "10px",
                      borderRadius: "4px",
                    }}
                  />
                  <span>{producto.nombre}</span>
                  <span style={{ marginLeft: "auto" }}>
                    ☀️ ${(producto.valor ?? 0).toLocaleString()}
                  </span>
                  <button
                    style={{ marginLeft: "10px", cursor: "pointer", background: "transparent", border: "none" }}
                    onClick={() => eliminarDelCarrito(index)}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "15px", fontWeight: "bold", fontSize: "18px", display: "flex", justifyContent: "space-between", padding: "0 10px" }}>
              <span>Total:</span>
              <span>☀️ ${total.toLocaleString()}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
              <button
                style={{
                  backgroundColor: AuthService.isLoggedIn() ? "#8B4513" : "#ccc",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: AuthService.isLoggedIn() ? "pointer" : "not-allowed",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  if (!AuthService.isLoggedIn()) {
                    alert("Debes iniciar sesión para hacer un pedido");
                  } else {
                    setShowForm(true);
                  }
                }}
              >
                Proceder Compra
              </button>
            </div>
          </>
        )}

        <button onClick={() => setOpen(false)} style={{ marginTop: "10px" }}>
          Cerrar
        </button>

        {showForm && (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 3000 }} onClick={() => setShowForm(false)}>
            <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "12px", width: "90%", maxWidth: "450px", boxShadow: "0 5px 15px rgba(0,0,0,0.3)" }} onClick={(e) => e.stopPropagation()}>
              <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Formulario de Compra</h2>
              <form onSubmit={handleSubmit}>
                {["nombre", "correo", "telefono", "direccion"].map((campo) => (
                  <div key={campo} style={{ marginBottom: "12px" }}>
                    <label>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
                    <input type={campo === "correo" ? "email" : "text"} name={campo} value={formData[campo]} onChange={handleChange} style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "6px", border: "1px solid #ccc" }} />
                  </div>
                ))}

                <div style={{ marginBottom: "12px" }}>
                  <label>Notas adicionales:</label>
                  <textarea name="notas" value={formData.notas} onChange={handleChange} placeholder="Ej: Dejar en recepción" style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "6px", border: "1px solid #ccc", resize: "vertical" }} />
                </div>

                <button type="submit" style={{ marginTop: "15px", width: "100%", backgroundColor: "#8B4513", color: "white", padding: "12px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}>
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
