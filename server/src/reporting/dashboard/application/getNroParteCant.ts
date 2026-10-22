import { NroParteCantReportingQuery } from "./port/dashboardReportingQuery";

export class GetNroParteCant {

    constructor(
        private query: NroParteCantReportingQuery
    ) {}

    async execute(anio: string): Promise<any> {
        return this.query.findAllNroParteCant(anio);
    }
}