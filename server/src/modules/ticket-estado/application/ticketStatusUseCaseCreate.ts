import { TicketStatusRepository } from "../domain/port-in/ticket-estadoRepository";
import { TicketStatus } from "../domain/ticket-estado";

export class TicketStatusUseCaseCreate {
    constructor(private ticketStatusRepository: TicketStatusRepository) { }

    async execute(id_ticket:number): Promise<void> {
        const ticket_status_new = new TicketStatus(
            0,
            new Date(),
            id_ticket,
            null,
            null,
            '',
            '',
            new Date(),
            new Date(),
            false,
            false);
        return await this.ticketStatusRepository.create(ticket_status_new);
    }
}