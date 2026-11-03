import { RolReportingQuery } from "./port/rolReportingQuery";

export class GetRolList {

    constructor(
        private query: RolReportingQuery
    ) {}

    async execute() {
        return this.query.findAll();
    }
}