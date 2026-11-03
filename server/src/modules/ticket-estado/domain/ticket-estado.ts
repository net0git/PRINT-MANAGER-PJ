export class TicketStatus {
    id_estado_ticket: number;
    created_at: Date;
    id_ticket: number;
    id_usuario_ti: number | null;
    id_usuario_al: number | null;
    ti_mensaje: string;
    al_mensaje: string;
    fecha_ti: Date;
    fecha_al: Date;
    estado_ti: boolean;
    estado_al: boolean;

    constructor(id_estado_ticket: number, created_at: Date, id_ticket: number, id_usuario_ti: number | null, id_usuario_al: number | null, ti_mensaje: string, al_mensaje: string, fecha_ti: Date, fecha_al: Date, estado_ti: boolean, estado_al: boolean) {
        this.id_estado_ticket = id_estado_ticket;
        this.created_at = created_at;
        this.id_ticket = id_ticket;
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
        id_estado_ticket: ${this.id_estado_ticket},
        created_at: ${this.created_at},
        id_ticket: ${this.id_ticket},
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
            id_estado_ticket: this.id_estado_ticket,
            created_at: this.created_at,
            id_ticket: this.id_ticket,
            id_usuario_ti: this.id_usuario_ti,
            id_usuario_al: this.id_usuario_al,
            ti_mensaje: this.ti_mensaje,
            al_mensaje: this.al_mensaje,
            fecha_ti: this.fecha_ti,
            fecha_al: this.fecha_al,
            estado_ti: this.estado_ti,
            estado_al: this.estado_al
        };
    }

}