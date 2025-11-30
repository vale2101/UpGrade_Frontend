export interface PedidoProducto {
    id_producto: number;
    cantidad: number;
    precio: number;
  }
  
  export interface PedidoInterface {
    id_pedido?: number;        
    id_user: number;           
    id_direccion: number;      
    fecha?: string;           
    estado?: 'Pendiente' | 'Pagado' | 'Enviado' | 'Entregado' | 'Cancelado';
    productos: PedidoProducto[];
    total?: number;            
  }
  