import { TicketStatusRepository } from "../domain/port-in/ticket-estadoRepository";
import { TicketStatus } from "../domain/ticket-estado";

export class TicketStatusUseCaseFindAll {
    constructor(private ticketStatusRepository: TicketStatusRepository) { }

    async execute(): Promise<TicketStatus[]> {
        return await this.ticketStatusRepository.findAll();
    }
}