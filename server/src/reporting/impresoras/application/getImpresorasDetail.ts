import { ImpresoraDetailDto } from "./dto/impresoraDetail.dto";
import { ImpresoraReportingQuery } from "./port/impresoraReportingQuery";

export class GetImpresorasDetail {

    constructor(
        private query: ImpresoraReportingQuery
    ) {}

    async execute(): Promise<ImpresoraDetailDto[]> {
        return this.query.findAll();
    }
}