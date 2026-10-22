import { TicketReportingQuery } from "./port/ticketReportingQuery";

export class GetTicketDetail {

    constructor(
        private query: TicketReportingQuery
    ) {}

    async execute(anio: string,id_usuario: number, id_rol: number): Promise<any> {
        return this.query.findAll(anio,id_usuario,id_rol);
    }
}