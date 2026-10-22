import { TicketReportingCountStatusQuery } from "./port/ticketReportingQuery";

export class GetTicketCountStatus {

    constructor(
        private query: TicketReportingCountStatusQuery
    ) {}

    async execute(anio: string): Promise<any> {
        return this.query.findCountStatus(anio);
    }
}