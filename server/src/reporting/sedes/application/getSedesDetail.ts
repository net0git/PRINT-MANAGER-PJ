import { SedeReportingQuery } from "./port/sedeReportingQuery";

export class GetSedesDetail {

    constructor(
        private query: SedeReportingQuery
    ) {}

    async execute() {
        return this.query.findAll();
    }
}