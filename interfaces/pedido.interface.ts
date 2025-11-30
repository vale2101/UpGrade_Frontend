export interface ProductoInterface {
    id_producto?: number; 
    nombre: string;
    precio: number;
    categoria: string;
    stock: number;
    tipo: "Nuevo" | "SemiNuevo" | "Reacondicionado"; 
    color: string;
    capacidad: string;
    id_ficha: number; 
    foto: string;     
    foto2?: string;   
    foto3?: string;   
  }
  