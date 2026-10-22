import { Response, Request } from "express";
import { TicketUseCaseCreate } from "../application/ticketUseCaseCreate";
import { TicketUseCaseFindAll } from "../application/ticketUseCaseFindAll";
import { TicketUseCaseFindById } from "../application/ticketUseCaseFindById";
import { TicketUseCaseUpdate } from "../application/ticketUseCaseUpdate";
import { Ticket } from "../domain/ticket";

export class TicketController {

    constructor(
        private ticketUseCaseCreate: TicketUseCaseCreate,
        private ticketUseCaseFindAll: TicketUseCaseFindAll,
        private ticketUseCaseFindById: TicketUseCaseFindById,
        private ticketUseCaseUpdate: TicketUseCaseUpdate
    ) { }

    async create(req: Request, res: Response) {
        const ticket = req.body;
        const ticketResult: Ticket = await this.ticketUseCaseCreate.execute(ticket.id_area, ticket.id_modelo, ticket.id_usuario, ticket.ip, ticket.descripcion, ticket.id_tipo_consumible, ticket.id_consumible, ticket.id_usuario_ti, ticket.id_usuario_al, ticket.ti_mensaje, ticket.al_mensaje, ticket.fecha_ti, ticket.fecha_al, ticket.estado_ti, ticket.estado_al);
        res.status(200).json(ticketResult);
    }

    async findAll(req: Request, res: Response) {
        const tickets = await this.ticketUseCaseFindAll.execute();
        res.status(200).send(tickets);
    }

    async findById(req: Request, res: Response) {
        try {
            const id_ticket = Number(req.params.id_ticket);

            const ticket = await this.ticketUseCaseFindById.execute(id_ticket);

            if (!ticket) {
                return res.status(404).json({
                    message: "Ticket no encontrado"
                });
            }

            return res.status(200).json(ticket);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: "Error interno del servidor"
            });
        }
    }

    async update(req: Request, res: Response) {
        const id_ticket = req.params.id_ticket;
        const ticket = req.body;
        await this.ticketUseCaseUpdate.execute(Number(id_ticket), ticket.id_area, ticket.id_modelo, ticket.id_usuario, ticket.ip, ticket.descripcion, ticket.id_tipo_consumible, ticket.id_consumible, ticket.estado_general, ticket.id_usuario_ti, ticket.id_usuario_al, ticket.ti_mensaje, ticket.al_mensaje, ticket.fecha_ti, ticket.fecha_al, ticket.estado_ti, ticket.estado_al);
        res.status(200).json({message:'Ticket actualizado correctamente'});
    }


}   