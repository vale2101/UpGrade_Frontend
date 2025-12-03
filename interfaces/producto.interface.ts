import { fichaInterface } from "./ficha.interface";
export interface productoInterface {
  id_producto?: number;
  nombre: string;
  precio: number | string; 
  categoria: string;
  stock: number;
  tipo: "Nuevo" | "SemiNuevo" | "Reacondicionado";
  color: string;
  capacidad: string;
  id_ficha: number;
  foto: string;        
  foto2?: string | null;      
  foto3?: string | null;      
  ficha?: fichaInterface; 
}