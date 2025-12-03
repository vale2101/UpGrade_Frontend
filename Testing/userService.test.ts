import axios from 'axios';
import { UserService } from '../services/userService';
import { User, CreateUserRequest, LoginRequest } from '../interfaces/user.interface';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe realizar login exitosamente', async () => {
    const loginData: LoginRequest = {
      correo: 'test@example.com',
      contrasena: 'password123'
    };

    const mockResponse = {
      success: true,
      message: 'Login exitoso',
      data: {
        token: 'mock-token',
        user: {
          id_user: 1,
          nombre: 'Test',
          apellido: 'User',
          correo: 'test@example.com',
          contrasena: 'hashed',
          telefono: '1234567890'
        }
      }
    };

    mockedAxios.post.mockResolvedValue({
      data: mockResponse
    });

    const result = await UserService.login(loginData);

    expect(result.success).toBe(true);
    expect(result.data?.token).toBe('mock-token');
    expect(result.data?.user.correo).toBe('test@example.com');
  });

  it('debe retornar lista de usuarios', async () => {
    const mockUsers: User[] = [
      {
        id_user: 1,
        nombre: 'Usuario 1',
        apellido: 'Apellido 1',
        correo: 'user1@example.com',
        contrasena: 'hashed1',
        telefono: '1234567890'
      },
      {
        id_user: 2,
        nombre: 'Usuario 2',
        apellido: 'Apellido 2',
        correo: 'user2@example.com',
        contrasena: 'hashed2',
        telefono: '0987654321'
      }
    ];

    mockedAxios.get.mockResolvedValue({
      data: {
        success: true,
        data: mockUsers
      }
    });

    const result = await UserService.getUsers();

    expect(result).toHaveLength(2);
    expect(result[0].correo).toBe('user1@example.com');
  });

  it('debe crear un nuevo usuario exitosamente', async () => {
    const newUser: CreateUserRequest = {
      nombre: 'Nuevo',
      apellido: 'Usuario',
      correo: 'nuevo@example.com',
      contrasena: 'password123',
      telefono: '1234567890'
    };

    const mockResponse = {
      success: true,
      message: 'Usuario creado',
      data: {
        id_user: 1,
        ...newUser,
        contrasena: 'hashed'
      }
    };

    mockedAxios.post.mockResolvedValue({
      data: mockResponse
    });

    const result = await UserService.createUser(newUser);

    expect(result.success).toBe(true);
    expect(result.data?.correo).toBe('nuevo@example.com');
  });

  it('debe actualizar un usuario exitosamente', async () => {
    const updateData = {
      nombre: 'Nombre Actualizado',
      telefono: '9999999999'
    };

    const mockResponse = {
      success: true,
      message: 'Usuario actualizado',
      data: {
        id_user: 1,
        nombre: 'Nombre Actualizado',
        apellido: 'Usuario',
        correo: 'user@example.com',
        contrasena: 'hashed',
        telefono: '9999999999'
      }
    };

    mockedAxios.put.mockResolvedValue({
      data: mockResponse
    });

    const result = await UserService.updateUser('1', updateData);

    expect(result.success).toBe(true);
    expect(result.data?.nombre).toBe('Nombre Actualizado');
  });

  it('debe eliminar un usuario exitosamente', async () => {
    const mockResponse = {
      success: true,
      message: 'Usuario eliminado',
      data: null
    };

    mockedAxios.delete.mockResolvedValue({
      data: mockResponse
    });

    const result = await UserService.deleteUser('1');

    expect(result.success).toBe(true);
  });
});

