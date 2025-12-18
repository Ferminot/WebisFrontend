// src/assets/js/macetaService.js
export const obtenerMacetas = async () => {
  try {
    const resp = await fetch("http://localhost:8080/macetas");
    if (!resp.ok) throw new Error("Error al obtener macetas");

    const data = await resp.json();

 
    return data.map(m => ({
      id: m.id,
      nombre: m.nombre,
      valor: m.valor,
      stock: m.stock,
      imgPrincipal: m.imgPrincipal
    }));
  } catch (error) {
    console.error("Error en obtenerMacetas:", error);
    return [];
  }
};
