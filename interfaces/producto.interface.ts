import { fichaInterface } from "./ficha.interface";
export interface productoInterface {
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
  ficha?: fichaInterface; // opcional: para incluir datos de la ficha asociada
}