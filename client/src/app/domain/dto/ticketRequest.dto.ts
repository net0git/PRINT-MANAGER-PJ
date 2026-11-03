export interface TicketRequest {
    id_area?: number;
    id_modelo?: number;
    id_usuario?: number;
    ip?: string | null;
    descripcion?: string | null;
    id_tipo_consumible?: number;
    id_consumible?: number;
    estado_general?: string;
    id_usuario_ti?: number;
    id_usuario_al?: number;
    ti_mensaje?: string;
    al_mensaje?: string;
    fecha_ti?: Date;
    fecha_al?: Date;
    estado_ti?: boolean;
    estado_al?: boolean;
}

