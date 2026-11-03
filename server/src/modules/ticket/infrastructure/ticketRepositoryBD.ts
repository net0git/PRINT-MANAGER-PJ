import { Ticket } from "../domain/ticket";
import { TicketRepository } from "../domain/port-in/ticketRepository";
import { AuditDb } from "../../../shared/database/audit-db";

export class TicketRepositoryBD implements TicketRepository {
    mapToTicket(row: any): Ticket {
        return new Ticket(
            row.id_ticket,
            row.created_at,
            row.codigo,
            row.id_usuario,
            row.id_modelo,
            row.id_area,
            row.ip,
            row.descripcion,
            row.id_tipo_consumible,
            row.id_consumible,
            row.estado_general,
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

    async findAll(): Promise<Ticket[]> {
        const query = `SELECT * FROM ticket`;
        const result = await AuditDb.onlyquery(query);
        return result.rows.map((row: any) => this.mapToTicket(row));
    }

    async findById(id_ticket: number): Promise<Ticket | undefined> {
        const query = `SELECT * FROM ticket WHERE id_ticket = $1`;
        const result = await AuditDb.queryvalue(query, [id_ticket]);

        if (result.rows.length === 0) {
            return undefined;
        }

        return this.mapToTicket(result.rows[0]);
    }

    async update(ticket: Ticket): Promise<void> {

        const datosActualizar: Record<string, any> = {};

        if (ticket.id_usuario !== undefined) datosActualizar.id_usuario = ticket.id_usuario;
        if (ticket.id_modelo !== undefined) datosActualizar.id_modelo = ticket.id_modelo;
        if (ticket.id_area !== undefined) datosActualizar.id_area = ticket.id_area;
        if (ticket.ip !== undefined) datosActualizar.ip = ticket.ip;
        if (ticket.descripcion !== undefined) datosActualizar.descripcion = ticket.descripcion;
        if (ticket.id_tipo_consumible !== undefined) datosActualizar.id_tipo_consumible = ticket.id_tipo_consumible;
        if (ticket.id_consumible !== undefined) datosActualizar.id_consumible = ticket.id_consumible;
        if (ticket.estado_general !== undefined) datosActualizar.estado_general = ticket.estado_general;
        if (ticket.id_usuario_ti !== undefined) datosActualizar.id_usuario_ti = ticket.id_usuario_ti;
        if (ticket.id_usuario_al !== undefined) datosActualizar.id_usuario_al = ticket.id_usuario_al;
        if (ticket.ti_mensaje !== undefined) datosActualizar.ti_mensaje = ticket.ti_mensaje;
        if (ticket.al_mensaje !== undefined) datosActualizar.al_mensaje = ticket.al_mensaje;
        if (ticket.fecha_ti !== undefined) datosActualizar.fecha_ti = ticket.fecha_ti;
        if (ticket.fecha_al !== undefined) datosActualizar.fecha_al = ticket.fecha_al;
        if (ticket.estado_ti !== undefined) datosActualizar.estado_ti = ticket.estado_ti;
        if (ticket.estado_al !== undefined) datosActualizar.estado_al = ticket.estado_al;

        const result = await AuditDb.update(
            "ticket",
            datosActualizar,
            {
                id_ticket: ticket.id_ticket
            }
        );

        if (result.rowCount === 0) {
            throw new Error("No se pudo actualizar el ticket");
        }
    }

    async create(ticket: Ticket): Promise<Ticket> {
        const result = await AuditDb.insert('ticket', {
            created_at: ticket.created_at,
            id_usuario: ticket.id_usuario,
            id_modelo: ticket.id_modelo,
            id_area: ticket.id_area,
            ip: ticket.ip,
            descripcion: ticket.descripcion,
            id_tipo_consumible: ticket.id_tipo_consumible,
            id_consumible: ticket.id_consumible,
            estado_general: ticket.estado_general,
            id_usuario_ti: ticket.id_usuario_ti,
            id_usuario_al: ticket.id_usuario_al,
            ti_mensaje: ticket.ti_mensaje,
            al_mensaje: ticket.al_mensaje,
            fecha_ti: ticket.fecha_ti,
            fecha_al: ticket.fecha_al,
            estado_ti: ticket.estado_ti,
            estado_al: ticket.estado_al

        });
        return this.mapToTicket(result.rows[0]);
    }
}   