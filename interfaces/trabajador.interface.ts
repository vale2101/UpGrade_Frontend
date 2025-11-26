export interface Trabajador {
  id_trabajador?: number;   // PK autoincremental
  nombre: string;           // VARCHAR(100)
  apellido: string;         // VARCHAR(100)
  correo: string;           // VARCHAR(150) UNIQUE
  telefono?: string;        // VARCHAR(20)
  contrasena: string;       // VARCHAR(255)
}

export interface CreateTrabajadorRequest {
  nombre: string;
  apellido: string;
  correo: string;
  telefono?: string;
  contrasena: string;
}

export interface UpdateTrabajadorRequest {
  nombre?: string;
  apellido?: string;
  correo?: string;
  telefono?: string;
  contrasena?: string;
}

export interface LoginTrabajadorRequest {
  correo: string;
  contrasena: string;
}

export interface LoginTrabajadorResponse {
  token: string;             // JWT o similar
  trabajador: Trabajador;    // Datos del trabajador autenticado
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
