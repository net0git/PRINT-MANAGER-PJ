export class Ticket {
    id_ticket: number;
    created_at: Date;
    codigo?: string;
    id_usuario: number;
    id_modelo: number;
    id_area: number;
    ip: string;
    descripcion: string;
    id_tipo_consumible: number;
    id_consumible: number;
    estado_general: string;
    id_usuario_ti: number;
    id_usuario_al: number;
    ti_mensaje: string;
    al_mensaje: string;
    fecha_ti: Date;
    fecha_al: Date;
    estado_ti: boolean;
    estado_al: boolean;


    constructor(
            id_ticket: number, 
            created_at: Date, 
            codigo: string, 
            id_usuario: number, 
            id_modelo: number, 
            id_area: number, 
            ip: string, 
            descripcion: string, 
            id_tipo_consumible: number, 
            id_consumible: number, 
            estado_general: string,
            id_usuario_ti: number,
            id_usuario_al: number,
            ti_mensaje: string,
            al_mensaje: string,
            fecha_ti: Date,
            fecha_al: Date,
            estado_ti: boolean,
            estado_al: boolean
        ) {
        this.id_ticket = id_ticket;
        this.created_at = created_at;
        this.codigo = codigo;
        this.id_usuario = id_usuario;
        this.id_modelo = id_modelo;
        this.id_area = id_area;
        this.ip = ip;
        this.descripcion = descripcion;
        this.id_tipo_consumible = id_tipo_consumible;
        this.id_consumible = id_consumible;
        this.estado_general = estado_general;
        this.id_usuario_ti = id_usuario_ti;
        this.id_usuario_al = id_usuario_al;
        this.ti_mensaje = ti_mensaje;
        this.al_mensaje = al_mensaje;
        this.fecha_ti = fecha_ti;
        this.fecha_al = fecha_al;
        this.estado_ti = estado_ti;
        this.estado_al = estado_al;
    }

    toString() {
        return `
        id_ticket: ${this.id_ticket},
        created_at: ${this.created_at},
        codigo: ${this.codigo},
        id_usuario: ${this.id_usuario},
        id_modelo: ${this.id_modelo},
        id_area: ${this.id_area},
        ip: ${this.ip},
        descripcion: ${this.descripcion},
        id_tipo_consumible: ${this.id_tipo_consumible},
        id_consumible: ${this.id_consumible},
        estado_general: ${this.estado_general},
        id_usuario_ti: ${this.id_usuario_ti},
        id_usuario_al: ${this.id_usuario_al},
        ti_mensaje: ${this.ti_mensaje},
        al_mensaje: ${this.al_mensaje},
        fecha_ti: ${this.fecha_ti},
        fecha_al: ${this.fecha_al},
        estado_ti: ${this.estado_ti},
        estado_al: ${this.estado_al}
    `;
    }

    public mapToPrimitives() {
        return {
            id_ticket: this.id_ticket,
            created_at: this.created_at,
            codigo: this.codigo,
            id_usuario: this.id_usuario,
            id_modelo: this.id_modelo,
            id_area: this.id_area,
            ip: this.ip,
            descripcion: this.descripcion,
            id_tipo_consumible: this.id_tipo_consumible,
            id_consumible: this.id_consumible,
            estado_general: this.estado_general,
            id_usuario_ti: this.id_usuario_ti,
            id_usuario_al: this.id_usuario_al,
            ti_mensaje: this.ti_mensaje,
            al_mensaje: this.al_mensaje,
            fecha_ti: this.fecha_ti,
            fecha_al: this.fecha_al,
            estado_ti: this.estado_ti
        };
    }

}
