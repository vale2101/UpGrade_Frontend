export interface Trabajador {
  id_trabajador?: number;   
  nombre: string;           
  apellido: string;         
  correo: string;           
  telefono?: string;        
  contrasena: string;       
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
  token: string;             
  trabajador: Trabajador;    
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
