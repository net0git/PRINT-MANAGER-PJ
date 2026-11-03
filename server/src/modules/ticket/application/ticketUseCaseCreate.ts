import { TicketRepository } from "../domain/port-in/ticketRepository";
import { Ticket } from "../domain/ticket";

export class TicketUseCaseCreate {
    constructor(private ticketRepository: TicketRepository) { }

    async execute(
        id_area: number, 
        id_modelo: number, 
        id_usuario: number,
        ip: string, 
        descripcion: string, 
        id_tipo_consumible: number, 
        id_consumible: number,
        id_usuario_ti: number,
        id_usuario_al: number,
        ti_mensaje: string,
        al_mensaje: string,
        fecha_ti: Date,
        fecha_al: Date,
        estado_ti: boolean,
        estado_al: boolean
    ): Promise<Ticket> {
        const ticket = new Ticket(
            0,
            new Date(),
            '', 
            id_usuario ,
            id_modelo, 
            id_area, 
            ip, 
            descripcion, 
            id_tipo_consumible, 
            id_consumible, 
            'I',
            id_usuario_ti,
            id_usuario_al,
            ti_mensaje,
            al_mensaje,
            fecha_ti,
            fecha_al,
            estado_ti,
            estado_al
        ) ;
        return await this.ticketRepository.create(ticket);
    }
} 