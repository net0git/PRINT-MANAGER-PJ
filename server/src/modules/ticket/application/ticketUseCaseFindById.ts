import { TicketRepository } from "../domain/port-in/ticketRepository";
import { Ticket } from "../domain/ticket";

export class TicketUseCaseFindById {
    constructor(private ticketRepository: TicketRepository) { }

    async execute(id_ticket: number): Promise<Ticket | undefined> {
        return await this.ticketRepository.findById(id_ticket);
    }
}