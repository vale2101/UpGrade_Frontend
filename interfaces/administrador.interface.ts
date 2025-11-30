export interface Administrador {
    id_administrador?: number;   // PK autoincremental
    nombre: string;              // VARCHAR(100)
    apellido: string;            // VARCHAR(100)
    correo: string;              // VARCHAR(150) UNIQUE
    telefono?: string;           // VARCHAR(20)
    contrasena: string;          // VARCHAR(255)
  }
  
  // 🔹 Request para crear administrador
  export interface CreateAdministradorRequest {
    nombre: string;
    apellido: string;
    correo: string;
    telefono?: string;
    contrasena: string;
  }
  
  // 🔹 Request para actualizar administrador
  export interface UpdateAdministradorRequest {
    nombre?: string;
    apellido?: string;
    correo?: string;
    telefono?: string;
    contrasena?: string;
  }
  
  // 🔹 Request para login administrador
  export interface LoginAdministradorRequest {
    correo: string;
    contrasena: string;
  }
  
  // 🔹 Response para login administrador
  export interface LoginAdministradorResponse {
    token: string;               // JWT o similar
    administrador: Administrador; // Datos del administrador autenticado
  }
  
  // 🔹 Respuesta genérica de API
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
  }
  