// src/assets/js/plantaService.js

export const obtenerPlantas = async () => {
  try {
    const resp = await fetch("http://localhost:8080/plantas");
    if (!resp.ok) throw new Error("Error al obtener plantas");

    const data = await resp.json();

 
    return data.map(p => ({
      id: p.id,
      nombre: p.nombre,
      valor: p.valor,
      stock: p.stock,
      descripcion: p.descripcion,
      img_principal: p.imgPrincipal, 
      img_hover: p.imgHover           
    }));
  } catch (error) {
    console.error("Error en obtenerPlantas:", error);
    return [];
  }
};

export const actualizarPrecio = async (id, nuevoValor) => {
  try {
    const resp = await fetch(
      `http://localhost:8080/plantas/${id}/precio`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ valor: nuevoValor })
      }
    );

    if (!resp.ok) throw new Error("Error al actualizar precio");

    return await resp.json();
  } catch (error) {
    console.error("Error al guardar precio:", error);
    throw error;
  }
};
