import { RolDetailDto } from "../dto/rolDetail.dto";

export interface RolReportingQuery {
    findAll(): Promise<RolDetailDto[]>;
}
