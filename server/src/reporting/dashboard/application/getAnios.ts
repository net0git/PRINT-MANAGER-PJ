import { AniosConsultDto } from "./dto/aniosConsult.dto";
import { DashboardReportingQuery } from "./port/dashboardReportingQuery";

export class GetAnios {

    constructor(
        private query: DashboardReportingQuery
    ) {}

    async execute(): Promise<AniosConsultDto[]> {
        return this.query.findAllAniosConsult();
    }
}