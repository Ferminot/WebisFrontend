import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Carrito from './Carrito';

describe('Carrito', () => {
  const mockSetOpen = vi.fn(); 
  const sampleCart = [
    { nombre: 'Girasol', precio: 2500, img: 'girasol.png' },
    { nombre: 'Cactus', precio: 1500, img: 'cactus.png' },
  ];

  it('muestra los productos agregados', () => {
    render(<Carrito open={true} setOpen={mockSetOpen} cart={sampleCart} />);
    
    expect(screen.getByText('Girasol')).toBeInTheDocument();
    expect(screen.getByText('Cactus')).toBeInTheDocument();
  });

  it('calcula el total correctamente', () => {
    render(<Carrito open={true} setOpen={mockSetOpen} cart={sampleCart} />);
    
    expect(screen.getByText(/☀️ \$4,000|☀️ \$4000/)).toBeInTheDocument();
  });

  it('llama a setOpen al cerrar', () => {
    render(<Carrito open={true} setOpen={mockSetOpen} cart={sampleCart} />);
    
    fireEvent.click(screen.getByText('Cerrar'));
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });
});
