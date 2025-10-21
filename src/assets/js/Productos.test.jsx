import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'; 
import { test, expect, vi } from "vitest"; 
import Carrito from './Carrito'; 



test('Muestra todos los productos en el carrito', () => {
  const sampleCart = [
    { nombre: 'Producto 1', precio: 1000, img: 'img1.png' },
    { nombre: 'Producto 2', precio: 2000, img: 'img2.png' },
    { nombre: 'Producto 3', precio: 3000, img: 'img3.png' },
  ];

  const mockSetOpen = vi.fn();

  render(<Carrito open={true} setOpen={mockSetOpen} cart={sampleCart} />);

  sampleCart.forEach(producto => {
    expect(screen.getByText(producto.nombre)).toBeInTheDocument();
  });

  // Log con la cantidad de productos encontrados
  console.log(`Test de ${sampleCart.length} productos pasado ✅`);
});
