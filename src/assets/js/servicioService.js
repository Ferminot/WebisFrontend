// src/assets/js/servicioService.js

export const obtenerServicios = async () => {
  try {
    const resp = await fetch("http://localhost:8080/servicios");
    if (!resp.ok) throw new Error("Error al obtener servicios");

    const data = await resp.json();

    
    return data.map(s => ({
      id: s.id,
      nombre: s.nombre,
      valor: s.valor,
      descripcion: s.descripcion,
      img_principal: s.img_principal
    }));
  } catch (error) {
    console.error("Error en obtenerServicios:", error);
    return [];
  }
};
