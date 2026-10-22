import { TicketReportingPendientesQuery } from "./port/ticketReportingQuery";

export class GetTicketPendientes {

    constructor(
        private query: TicketReportingPendientesQuery
    ) {}

    async execute(anio: string): Promise<any> {
        return this.query.findAllPendientes(anio);
    }
}