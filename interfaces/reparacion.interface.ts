export interface reparacionInterface {
    id_reparacion?: number; 
    estado: "Recibido" | "Revisión" | "Reparación" | "Reparado" | "Cancelado";
    dispositivo: string; 
    observaciones?: string | null; 
    costo: number; 
    id_user: number; 
    id_trabajador: number; 
  }