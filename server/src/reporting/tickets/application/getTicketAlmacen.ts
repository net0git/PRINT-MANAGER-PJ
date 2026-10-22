import { TicketReportingAlmacenQuery } from "./port/ticketReportingQuery";

export class GetTicketAlmacen {

    constructor(
        private query: TicketReportingAlmacenQuery
    ) {}

    async execute(anio: string): Promise<any> {
        return this.query.findAllAlmacen(anio);
    }
}