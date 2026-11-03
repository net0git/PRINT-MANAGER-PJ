import { Response, Request } from "express";
import { TicketStatusUseCaseCreate } from "../application/ticketStatusUseCaseCreate";
import { TicketStatusUseCaseFindAll } from "../application/ticketStatusUseCaseFindAll";
import { TicketStatusUseCaseFindById } from "../application/ticketStatusUseCaseFindById";
import { TicketStatusUseCaseUpdate } from "../application/ticketStatusUseCaseUpdate";

export class TicketStatusController {

    constructor(
        private ticketStatusUseCaseCreate: TicketStatusUseCaseCreate,
        private ticketStatusUseCaseFindAll: TicketStatusUseCaseFindAll,
        private ticketStatusUseCaseFindById: TicketStatusUseCaseFindById,
        private ticketStatusUseCaseUpdate: TicketStatusUseCaseUpdate
    ) { }

    async create(req: Request, res: Response) {
        const ticket_status = req.body;
        await this.ticketStatusUseCaseCreate.execute(ticket_status.id_ticket);
        res.status(200).json({message:'ticket status creado'});
    }

    async findAll(req: Request, res: Response) {
        const ticket_statuses = await this.ticketStatusUseCaseFindAll.execute();
        res.status(200).json(ticket_statuses);
    }

    async findById(req: Request, res: Response) {
        try {
            const id_estado_ticket = Number(req.params.id_estado_ticket);

            const ticket_status = await this.ticketStatusUseCaseFindById.execute(id_estado_ticket);

            if (!ticket_status) {
                return res.status(404).json({
                    message: "Ticket status no encontrado"
                });
            }

            return res.status(200).json(ticket_status);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: "Error interno del servidor"
            });
        }
    }

    async update(req: Request, res: Response) {
        const id_estado_ticket = req.params.id_estado_ticket;
        const ticket_status = req.body;
        await this.ticketStatusUseCaseUpdate.execute(Number(id_estado_ticket), ticket_status.id_ticket, ticket_status.id_usuario_ti, ticket_status.id_usuario_al, ticket_status.ti_mensaje, ticket_status.al_mensaje, ticket_status.fecha_ti, ticket_status.fecha_al, ticket_status.estado_ti, ticket_status.estado_al);
        res.status(200).json({message:'Ticket status actualizado correctamente'});
    }


}