import { TicketRepository } from "../domain/port-in/ticketRepository";
import { Ticket } from "../domain/ticket";

export class TicketUseCaseFindAll {
    constructor(private ticketRepository: TicketRepository) {}

    async execute(): Promise<Ticket[]> {
        return await this.ticketRepository.findAll();
    }
}