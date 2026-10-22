import { TicketReportingCountMesQuery } from "./port/ticketReportingQuery";

export class GetTicketCountMes {

    constructor(
        private query: TicketReportingCountMesQuery
    ) {}

    async execute(anio: string): Promise<any> {
        return this.query.findCountMes(anio);
    }
}