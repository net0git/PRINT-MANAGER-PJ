import { AreaCantConsumibleReportingQuery } from "./port/dashboardReportingQuery";

export class GetAreaCantiConsumible {

    constructor(
        private query: AreaCantConsumibleReportingQuery
    ) {}

    async execute(anio: string): Promise<any> {
        return this.query.findAllAreaCant(anio);
    }
}