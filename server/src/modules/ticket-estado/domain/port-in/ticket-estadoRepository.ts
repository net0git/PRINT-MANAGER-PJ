import { TicketStatus } from "../ticket-estado";

export interface TicketStatusRepository {
    findAll(): Promise<TicketStatus[]>;
    findById(id_ticket_status: number): Promise<TicketStatus | undefined>;
    update(ticket_status: TicketStatus): Promise<void>;
    create(ticket_status: TicketStatus): Promise<void>;
}