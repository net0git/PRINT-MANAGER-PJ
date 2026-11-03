export interface TicketDetailHistorialResponse {
  id_ticket: number;
  codigo: string;
  created_at: Date;
  descripcion: string,
  estado_general: string,
  estado_general_descripcion: string,
  impresora: {
    id_marca: number;
    id_modelo: number;
    marca: string;
    modelo: string;
    ip: string;
  };
  consumible: {
    id_consumible: number,
    nro_parte: string,
    id_tipo_consumible: number,
    tipo_consumible: string,
  };
  usuario: {
    id_usuario: number;
    nombre: string;
    ap_paterno: string;
    ap_materno: string;
    correo: string;
    telefono: string;
    id_rol: number;
    rol: string;
  };
  area: {
    id_area: number,
    area: string,
    sede: {
      id_sede: number,
      sede: string
      direccion: string
    }
  };
  estado: {
    informatica: {
      id_usuario: number,
      nombre: string,
      estado: boolean,
      mensaje: string,
      fecha: Date
    },
    almacen: {
      id_usuario: number,
      nombre: string,
      estado: boolean,
      mensaje: string,
      fecha: Date
    }
  }
}

export interface TicketDetailResponse {
  id_ticket: number;
  created_at: Date;
  codigo: string;
  id_usuario: number;
  id_modelo: number;
  id_area: number;
  ip: string;
  descripcion: string;
  id_tipo_consumible: number;
  id_consumible: number;
  estado_general: string;
}

export interface TicketResponse {
  id_ticket: number;
  created_at: Date;
  codigo: string;
  id_usuario: number;
  id_modelo: number;
  id_area: number;
  ip: string;
  descripcion: string;
  id_tipo_consumible: number;
  id_consumible: number;
  estado_general: string;
}

export interface TicketCreate {
  id_ticket: number;
  created_at: Date;
  codigo: string;
  id_usuario: number;
  id_modelo: number;
  id_area: number;
  ip: string;
  descripcion: string;
  id_tipo_consumible: number;
  id_consumible: number;
  estado_general: string;
}

export interface TicketStatusCreate {
  message: string;
}

export interface TicketUpdate {
  message: string;
}


export interface TicketCountStatusDto {
    total_solicitudes: number;
    total_pendientes: number;
    total_almacen: number;
    total_finalizados: number;
    total_rechazados: number;
}

export interface TicketCountMesDto {
    mes: string;
    cantidad: number;
}