import { ConsumibleDetailDto } from "../dto/consumibleDetail.dto";

export interface ConsumibleReportingQuery {
    findAll(): Promise<ConsumibleDetailDto[]>;
}