import { SedesDetailDto } from "../dto/sedesDetail.dto";

export interface SedeReportingQuery {
    findAll(): Promise<SedesDetailDto[]>
}