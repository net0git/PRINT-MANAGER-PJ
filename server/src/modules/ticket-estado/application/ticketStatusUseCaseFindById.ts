import { TicketStatusRepository } from "../domain/port-in/ticket-estadoRepository";
import { TicketStatus } from "../domain/ticket-estado";

export class TicketStatusUseCaseFindById {
    constructor(private ticketStatusRepository: TicketStatusRepository) { }

    async execute(id_ticket_status: number): Promise<TicketStatus | undefined> {
        return await this.ticketStatusRepository.findById(id_ticket_status);
    }
}