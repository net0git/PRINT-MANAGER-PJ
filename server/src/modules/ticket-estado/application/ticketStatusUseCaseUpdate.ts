import { TicketStatusRepository } from "../domain/port-in/ticket-estadoRepository";
import { TicketStatus } from "../domain/ticket-estado";

export class TicketStatusUseCaseUpdate {
    constructor(private ticketStatusRepository: TicketStatusRepository) { }

    async execute(
        id_estado_ticket: number,
        id_ticket: number,
        id_usuario_ti: number,
        id_usuario_al: number,
        ti_mensaje: string,
        al_mensaje: string,
        fecha_ti: Date,
        fecha_al: Date,
        estado_ti: boolean,
        estado_al: boolean,): Promise<void> {
        const ticket_status_update = new TicketStatus(
            id_estado_ticket,
            new Date(),
            id_ticket,
            id_usuario_ti,
            id_usuario_al,
            ti_mensaje,
            al_mensaje,
            new Date(),
            new Date(),
            estado_ti,
            estado_al
        );
        return await this.ticketStatusRepository.update(ticket_status_update);
    }
}