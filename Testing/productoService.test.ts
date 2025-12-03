import axios from 'axios';
import { ProductoService } from '../services/producto.service';
import { productoInterface } from '../interfaces/producto.interface';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ProductoService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe retornar productos cuando la respuesta tiene data como array', async () => {
    const mockProductos: productoInterface[] = [
      {
        id_producto: 1,
        nombre: 'Producto 1',
        precio: 1000000,
        categoria: 'Samsung',
        stock: 10,
        tipo: 'Nuevo',
        color: 'Negro',
        capacidad: '128GB',
        id_ficha: 1,
        foto: 'foto1.jpg'
      }
    ];

    mockedAxios.get.mockResolvedValue({
      data: { data: mockProductos }
    });

    const result = await ProductoService.getProductos();

    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockProductos);
  });

  it('debe retornar un producto cuando existe', async () => {
    const mockProducto: productoInterface = {
      id_producto: 1,
      nombre: 'Producto 1',
      precio: 1000000,
      categoria: 'Samsung',
      stock: 10,
      tipo: 'Nuevo',
      color: 'Negro',
      capacidad: '128GB',
      id_ficha: 1,
      foto: 'foto1.jpg'
    };

    mockedAxios.get.mockResolvedValue({
      data: { data: mockProducto }
    });

    const result = await ProductoService.getProductoById(1);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockProducto);
  });

  it('debe crear un producto exitosamente', async () => {
    const newProducto: productoInterface = {
      nombre: 'Nuevo Producto',
      precio: 1500000,
      categoria: 'iPhone',
      stock: 8,
      tipo: 'Nuevo',
      color: 'Azul',
      capacidad: '128GB',
      id_ficha: 1,
      foto: 'foto.jpg'
    };

    const mockResponse = {
      success: true,
      message: 'Producto creado',
      data: { ...newProducto, id_producto: 1 }
    };

    mockedAxios.post.mockResolvedValue({
      data: mockResponse
    });

    const result = await ProductoService.createProducto(newProducto);

    expect(result.success).toBe(true);
    expect(result.data?.id_producto).toBe(1);
  });

  it('debe actualizar el stock de un producto', async () => {
    const mockResponse = {
      success: true,
      message: 'Stock actualizado',
      data: {
        id_producto: 1,
        stock: 20
      }
    };

    mockedAxios.put.mockResolvedValue({
      data: mockResponse
    });

    const result = await ProductoService.updateProductoStock(1, 20);

    expect(result.success).toBe(true);
    expect(result.data?.stock).toBe(20);
  });

  it('debe eliminar un producto exitosamente', async () => {
    const mockResponse = {
      success: true,
      message: 'Producto eliminado',
      data: null
    };

    mockedAxios.delete.mockResolvedValue({
      data: mockResponse
    });

    const result = await ProductoService.deleteProducto(1);

    expect(result.success).toBe(true);
  });
});

