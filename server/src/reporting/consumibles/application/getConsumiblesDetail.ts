import { ConsumibleReportingQuery } from "./port/consumibleReportingQuery";

export class GetConsumiblesDetail {

    constructor(
        private query: ConsumibleReportingQuery
    ) {}

    async execute() {
        return this.query.findAll();
    }
}