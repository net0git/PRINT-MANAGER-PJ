import { Ticket } from "../ticket";

export interface TicketRepository {
    findAll(): Promise<Ticket[]>;
    findById(id_ticket: number): Promise<Ticket | undefined>;
    update(ticket: Ticket): Promise<void>;
    create(ticket: Ticket): Promise<Ticket>;
}