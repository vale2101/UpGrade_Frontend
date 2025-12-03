export interface Administrador {
    id_administrador?: number;   
    nombre: string;              
    apellido: string;            
    correo: string;              
    telefono?: string;           
    contrasena: string;          
  }
  
  export interface CreateAdministradorRequest {
    nombre: string;
    apellido: string;
    correo: string;
    telefono?: string;
    contrasena: string;
  }
  
  export interface UpdateAdministradorRequest {
    nombre?: string;
    apellido?: string;
    correo?: string;
    telefono?: string;
    contrasena?: string;
  }
  
  export interface LoginAdministradorRequest {
    correo: string;
    contrasena: string;
  }
  
  export interface LoginAdministradorResponse {
    token: string;               
    administrador: Administrador; 
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
  }
  