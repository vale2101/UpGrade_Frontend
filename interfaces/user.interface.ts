export interface User {
  id_user?: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  telefono?: string;
  id_direccion?: number;
  fecha_registro?: string;
}

export interface CreateUserRequest {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  telefono?: string;
  id_direccion?: number;
}

export interface UpdateUserRequest {
  nombre?: string;
  apellido?: string;
  correo?: string;
  contrasena?: string;
  telefono?: string;
  id_direccion?: number;
}

export interface LoginRequest {
  correo: string;
  contrasena: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
