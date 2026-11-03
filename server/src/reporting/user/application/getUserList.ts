import { UserReportingQuery } from "./port/userReportinQuery";

export class GetUserList {

    constructor(
        private query: UserReportingQuery
    ) {}

    async execute() {
        return this.query.findAll();
    }
}