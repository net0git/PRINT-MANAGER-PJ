import { TicketStatus } from "../domain/ticket-estado";
import { TicketStatusRepository } from "../domain/port-in/ticket-estadoRepository";
import { AuditDb } from "../../../shared/database/audit-db";

export class TicketStatusRepositoryBD implements TicketStatusRepository {
    mapToTicketStatus(row: any): TicketStatus {
        return new TicketStatus(
            row.id_estado_ticket,
            row.created_at,
            row.id_ticket,
            row.id_usuario_ti,
            row.id_usuario_al,
            row.ti_mensaje,
            row.al_mensaje,
            row.fecha_ti,
            row.fecha_al,
            row.estado_ti,
            row.estado_al
        );
    }

    async findAll(): Promise<TicketStatus[]> {
        const query = `SELECT * FROM estado_ticket`;
        const result = await AuditDb.onlyquery(query);
        return result.rows.map((row: any) => this.mapToTicketStatus(row));
    }

    async findById(id_estado_ticket: number): Promise<TicketStatus | undefined> {
        const query = `SELECT * FROM estado_ticket WHERE id_estado_ticket = $1`;
        const values = [id_estado_ticket];
        const result = await AuditDb.queryvalue(query, values);
        return this.mapToTicketStatus(result.rows[0]);
    }

    async update(ticket_status: TicketStatus): Promise<void> {
        const result = await AuditDb.update("estado_ticket", {
            ti_mensaje: ticket_status.ti_mensaje,
            al_mensaje: ticket_status.al_mensaje,
            fecha_ti: ticket_status.fecha_ti,
            fecha_al: ticket_status.fecha_al,
            estado_ti: ticket_status.estado_ti,
            estado_al: ticket_status.estado_al
        }, {
            id_estado_ticket: ticket_status.id_estado_ticket
        })

        if (result.rowCount === 0) {
            throw new Error("No se pudo actualizar el estado ticket");
        }
    }

    async create(ticket_status: TicketStatus): Promise<void> {
        const result = await AuditDb.insert('estado_ticket', {
            created_at: ticket_status.created_at,
            id_ticket: ticket_status.id_ticket,
            id_usuario_ti: ticket_status.id_usuario_ti,
            id_usuario_al: ticket_status.id_usuario_al,
            ti_mensaje: ticket_status.ti_mensaje,
            al_mensaje: ticket_status.al_mensaje,
            fecha_ti: ticket_status.fecha_ti,
            fecha_al: ticket_status.fecha_al,
            estado_ti: ticket_status.estado_ti,
            estado_al: ticket_status.estado_al
        });
        console.log(result);
    }
}