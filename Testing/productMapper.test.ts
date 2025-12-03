import { mapProductoToProduct, extractBrand, mapSlugToBackendCategory, filterProductsByCategory } from '../utils/productMapper';
import { productoInterface } from '../interfaces/producto.interface';

describe('productMapper', () => {
  it('debe mapear correctamente un producto con precio como string', () => {
    const producto: productoInterface = {
      id_producto: 1,
      nombre: 'iPhone 13',
      precio: '1500000',
      categoria: 'iPhone',
      stock: 10,
      tipo: 'Nuevo',
      color: 'Negro',
      capacidad: '128GB',
      id_ficha: 1,
      foto: 'foto1.jpg'
    };

    const result = mapProductoToProduct(producto);

    expect(result.id).toBe('1');
    expect(result.name).toBe('iPhone 13');
    expect(result.condition).toBe('Nuevo');
    expect(result.category).toBe('iPhone');
    expect(result.stock).toBe(10);
  });

  it('debe mapear correctamente un producto con precio como número', () => {
    const producto: productoInterface = {
      id_producto: 2,
      nombre: 'Samsung Galaxy S21',
      precio: 2000000,
      categoria: 'Samsung',
      stock: 5,
      tipo: 'SemiNuevo',
      color: 'Blanco',
      capacidad: '256GB',
      id_ficha: 2,
      foto: 'foto2.jpg'
    };

    const result = mapProductoToProduct(producto);

    expect(result.id).toBe('2');
    expect(result.name).toBe('Samsung Galaxy S21');
    expect(result.currentPrice).toContain('$');
    expect(result.installments).toBe(6);
  });

  it('debe incluir todas las fotos disponibles en el array de imágenes', () => {
    const producto: productoInterface = {
      id_producto: 3,
      nombre: 'iPad Pro',
      precio: 3000000,
      categoria: 'iPad',
      stock: 3,
      tipo: 'Reacondicionado',
      color: 'Gris',
      capacidad: '512GB',
      id_ficha: 3,
      foto: 'foto1.jpg',
      foto2: 'foto2.jpg',
      foto3: 'foto3.jpg'
    };

    const result = mapProductoToProduct(producto);

    expect(result.images).toHaveLength(3);
    expect(result.images?.[0]).toBe('foto1.jpg');
    expect(result.images?.[1]).toBe('foto2.jpg');
    expect(result.images?.[2]).toBe('foto3.jpg');
  });

  it('debe extraer Samsung de nombres que contengan samsung o galaxy', () => {
    expect(extractBrand('Samsung Galaxy S21')).toBe('Samsung');
    expect(extractBrand('Galaxy Note 20')).toBe('Samsung');
  });

  it('debe filtrar productos por categoría específica', () => {
    const products = [
      { id: '1', name: 'Producto 1', image: 'img1.jpg', category: 'Samsung', currentPrice: '$1000', condition: 'Nuevo' },
      { id: '2', name: 'Producto 2', image: 'img2.jpg', category: 'iPhone', currentPrice: '$2000', condition: 'Nuevo' },
      { id: '3', name: 'Producto 3', image: 'img3.jpg', category: 'Samsung', currentPrice: '$1500', condition: 'Nuevo' }
    ];

    const result = filterProductsByCategory(products, 'Samsung');
    expect(result).toHaveLength(2);
    expect(result.every(p => p.category === 'Samsung')).toBe(true);
  });
});

